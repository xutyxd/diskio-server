import { IHTTPContextData } from "server-over-express";
import { IDDbQueryWhere, UUIDDbQueryWhere } from "../../database/classes";
import { IDbQueryWhere, IIndexDbQueryWhere } from "../../database/interfaces";
import { BaseError, InternalError } from "../errors";
import { IEntityAPIData, IEntityData, IEntityModelData } from "../interfaces/data";
import { IEntityRepository } from "../interfaces/services";
import { IEntityStatic } from "../interfaces/static";

export class EntityService<A extends IEntityAPIData, D extends IEntityData, M extends IEntityModelData, SE extends IEntityStatic<A, D, M> = IEntityStatic<A, D, M>> {

    constructor(private readonly repository: IEntityRepository<M>,
                private readonly entity: SE) { }

    private query = {
        index : (index: number | string) => {
            let query: IIndexDbQueryWhere<M>;

            if (typeof index === 'string') {
                query = new UUIDDbQueryWhere(index);
            } else {
                query = new IDDbQueryWhere(index);
            }

            return query;
        }
    }
    public async create(data: Partial<D>, context?: IHTTPContextData) {

        let entityCreated: D;

        try {
            // Transform the data to the model
            const toInsert = new this.entity(data).toModel();
            // Insert it to the database
            const entityInserted = await this.repository.insert(toInsert);
            // Transform to domain instance
            const entity = this.entity.fromModel(entityInserted);
            // Transform to domain data type
            entityCreated = entity.toDomain();
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalError('Error creating entity');
        }

        return entityCreated;
    }

    public async get(index: number | string, context?: IHTTPContextData) {
        let entityGetted: D;

        try {
            // Get query to index entity
            const query = this.query.index(index);
            // Get the entity from the database
            const entityFounded = await this.repository.get(query);
            // Transform to domain instance
            const entity = this.entity.fromModel(entityFounded);
            // Transform to domain data type
            entityGetted = entity.toDomain();
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalError('Error getting entity from model');
        }

        return entityGetted;
    }

    public async list(where: IDbQueryWhere<M>[], context?: IHTTPContextData) {
        let entitiesGetted: D[] | undefined;

        try {
            // Get the entities from the database
            const entitiesFounded = await this.repository.list(where);
            // Transform to domain instance
            entitiesGetted = entitiesFounded.map((entityFounded) => {
                // Transform to domain instance
                const entity = this.entity.fromModel(entityFounded);
                // Transform to domain data type
                return entity.toDomain();
            });
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalError('Error getting entities');
        }

        return entitiesGetted || [];
    }

    public async update(index: number | string, data: D, context?: IHTTPContextData) {
        let entityUpdated: D;

        try {
            // Get query to index entity
            const query = this.query.index(index);
            // Transform the data to the model
            const toUpdate = new this.entity(data).toModel();
            // Update it to the database
            const entityModelUpdated = await this.repository.update(query, toUpdate);
            // Transform to domain instance
            const entity = this.entity.fromModel(entityModelUpdated);
            // Transform to domain data type
            entityUpdated = entity.toDomain();
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalError('Error updating entity from model');
        }

        return entityUpdated;
    }

    public async delete(index: number | string, context?: IHTTPContextData) {
        let entityDeleted: D;
        try {
            // Get query to index entity
            const query = this.query.index(index);
            // Delete the entity from the database
            const entityModelDeleted = await this.repository.delete(query);
            // Transform to domain instance
            const entity = this.entity.fromModel(entityModelDeleted);
            // Transform to domain data type
            entityDeleted = entity.toDomain();
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalError('Error deleting entity');
        }

        return entityDeleted;
    }
}