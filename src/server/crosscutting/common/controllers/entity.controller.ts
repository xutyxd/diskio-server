import Ajv from "ajv";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPControllerHandler } from "server-over-express";
import { BaseError, NotFoundError } from "../errors";
import { IEntityAPIData, IEntityData, IEntityModelData } from "../interfaces/data";
import { IEntityAPIStatic } from "../interfaces/static";
import { BadRequestResponse, InternalErrorResponse, NotFoundResponse } from "../responses";
import { idRequest } from "../schemas";
import { EntityService } from "../services";

export class EntityController<A extends IEntityAPIData, D extends IEntityData, M extends IEntityModelData, SA extends IEntityAPIStatic<A, D> = IEntityAPIStatic<A, D>> {

    constructor(private service: EntityService<A, D, M>,
                private schemas: { base: object, create: object, update: object, ref: string },
                private readonly api: SA) { }

    public handlers: IHTTPControllerHandler<A | A[]>[] = [
        {
            path: { method: HttpMethodEnum.POST },
            action: this.create.bind(this)
        },
        {
            path: { method: HttpMethodEnum.GET },
            action: this.list.bind(this)
        },
        {
            path: { method: HttpMethodEnum.GET, relative: ':id' },
            action: this.get.bind(this)
        },
        {
            path: { method: HttpMethodEnum.PATCH, relative: ':id' },
            action: this.update.bind(this)
        },
        {
            path: { method: HttpMethodEnum.DELETE, relative: ':id' },
            action: this.delete.bind(this)
        }
    ];

    private validate = {
        params: (request: HTTPRequest, context: IHTTPContextData) => {
            const { params } = request;

            const ajv = new Ajv({ strict: false });
            const validate = ajv.compile<{ uuid: string }>(idRequest);

            if (!validate(params)) {
                const error = validate.errors?.map(({ message }) => message).join(', ');
                throw new BadRequestResponse(error || 'something is missing', context);
            }
            
            const { uuid } = params;

            return uuid;
        },
        body: (request: HTTPRequest, context: IHTTPContextData, schema: object) => {
            const { body } = request;

            const ajv = new Ajv({ strict: false })
                            .addSchema(this.schemas.base, this.schemas.ref);
            const validate = ajv.compile<A>(schema);

            if (!validate(body)) {
                const error = validate.errors?.map(({ message }) => message).join(', ');
                throw new BadRequestResponse(error || 'something is missing', context);
            }

            return body;
        }
    }

    public async create(request: HTTPRequest, context: IHTTPContextData) {

        const body = this.validate.body(request, context, this.schemas.create);

        let result: A;

        try {
            // Instantiate to api
            const apiEntity = new this.api(body);
            // Transform to domain
            const domainEntity = apiEntity.toDomain();
            // Create the entity
            const entityCreated = await this.service.create(domainEntity, context);
            // Transform to api
            const apiCreated = this.api.fromDomain(entityCreated);
            // Transform to data
            result = apiCreated.toApi();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error creating record';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {

        let result: A[];

        try {
            const entities = await this.service.list([], context);

            result = entities.map((entity) => this.api.fromDomain(entity).toApi());
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error listing record';

            throw new InternalErrorResponse(message, context);
        }

        return result;
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);

        let result: A;

        try {
            // Find the entity
            const entity = await this.service.get(uuid, context);
            // Transform to api
            const apiEntity = this.api.fromDomain(entity);
            // Transform to data
            result = apiEntity.toApi();

        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error getting record';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }

    public async update(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);
        const body = this.validate.body(request, context, this.schemas.update);

        let result: A;

        try {
            // Instantiate to api
            const apiEntity = new this.api(body);
            // Transform to domain
            const domainEntity = apiEntity.toDomain();
            // Create the entity
            const entityUpdated = await this.service.update(uuid, domainEntity, context);
            // Transform to api
            const apiUpdated = this.api.fromDomain(entityUpdated);
            // Transform to data
            result = apiUpdated.toApi();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error updating entity';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        const uuid = this.validate.params(request, context);

        let result: A;

        try {
            // Find the entity
            const entity = await this.service.delete(uuid, context);
            // Transform to api
            const apiEntity = this.api.fromDomain(entity);
            // Transform to data
            result = apiEntity.toApi();
        } catch (error) {
            const message = error instanceof BaseError ? error.message : 'Error deleting entity';

            const toInstance = error instanceof NotFoundError ? NotFoundResponse : InternalErrorResponse;
            const toThrow = new toInstance(message, context);

            throw toThrow;
        }

        return result;
    }
}
