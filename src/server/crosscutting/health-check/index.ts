import { Container } from "inversify";

import { HealthCheckController } from "./controllers/health-check.controller";
import { HealthCheckRepository } from "./repository/health-check.repository";
import { HealthCheckService } from "./services/health-check.service";

const HealthCheckContainer = new Container();

HealthCheckContainer.bind<HealthCheckController>(HealthCheckController).toSelf();
HealthCheckContainer.bind<HealthCheckService>(HealthCheckService).toSelf();
HealthCheckContainer.bind<HealthCheckRepository>(HealthCheckRepository).toSelf();

export { HealthCheckContainer, HealthCheckController };