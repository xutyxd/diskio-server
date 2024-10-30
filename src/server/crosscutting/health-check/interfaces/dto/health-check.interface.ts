import { IEntity } from "../../../common/interfaces/dto";
import { IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData } from "../data";

export interface IHealthCheck extends IEntity<IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData> { }