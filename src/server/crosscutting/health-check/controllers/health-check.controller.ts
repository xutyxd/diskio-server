import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from 'server-over-express';
import { EntityController } from '../../common';
import { IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData } from '../interfaces/data';
import { HealthCheckService } from '../services/health-check.service';
import { HealthCheckAPI } from '../classes';

@injectable()
export class HealthCheckController extends EntityController<IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData> implements IHTTPController {

    public path = 'health-check';
    public handlers: IHTTPControllerHandler<IHealthCheckAPIData>[];

    constructor(@inject(HealthCheckService) private readonly healthCheckService: HealthCheckService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/health-check-base.request'
        };

        super(healthCheckService, schemas, HealthCheckAPI);
        // Override handlers
        this.handlers = [
            {
                path: { method: HttpMethodEnum.GET },
                action: this.healthCheck.bind(this) // IMPORTANT: Bind this to the controller
            }
        ]
    }

    private async healthCheck(request: HTTPRequest, context: IHTTPContextData) {
        // Get first one, there should only be one
        const [ healthCheck ] = await super.list(request, context);
        // Return it
        return healthCheck;
    }
}