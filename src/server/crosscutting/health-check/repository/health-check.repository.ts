import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../common";
import { IHealthCheckData, IHealthCheckModelData } from "../interfaces/data";
import { HealthCheckModel } from "../classes";
import { IDatabase } from "../../database/interfaces";

@injectable()
export class HealthCheckRepository extends EntityRepositoryService<IHealthCheckData, IHealthCheckModelData> {
    constructor(@inject('IDatabase') databaseService: IDatabase<IHealthCheckModelData>) {
        const table = 'health_check';
        super(databaseService, table, HealthCheckModel);
    }
}