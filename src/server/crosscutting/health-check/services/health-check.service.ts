import { inject, injectable } from "inversify";
import { EntityService } from "../../common";
import { HealthCheck } from "../classes";
import { name, version } from '../../../../../package.json';
import { IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData } from "../interfaces/data";
import { HealthCheckRepository } from "../repository/health-check.repository";

@injectable()
export class HealthCheckService extends EntityService<IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData> {
    constructor(@inject(HealthCheckRepository) readonly healthCheckRepository: HealthCheckRepository) {
        super(healthCheckRepository, HealthCheck);
        this.updateMemory();
    }

    private async updateMemory() {
        // Create health check in memory
        const healthCheck = new HealthCheck({
            server: {
                name,
                version: version as `${number}.${number}.${number}`,
                memory: process.memoryUsage()
            },
            uptime: process.uptime()
        });
        // Save health check in database
        const created = await super.create(healthCheck.toModel());

        const interval = setInterval(async () => {
            // Create health check in memory
            const healthCheck = new HealthCheck({
                server: {
                    name,
                    version: version as `${number}.${number}.${number}`,
                    memory: process.memoryUsage()
                },
                uptime: process.uptime()
            });
            // Update health check in database every 2500ms
            await super.update(created.uuid, healthCheck.toDomain());
        }, 2500);

        process.on("SIGTERM", () => {
            clearInterval(interval);
        });
    }
}