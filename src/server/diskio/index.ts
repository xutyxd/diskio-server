import { Container } from "inversify";

import { DiskioController } from "./controllers/diskio.controller";
import { DiskioRepository } from "./repository/diskio.repository";
import { DiskioService } from "./services/diskio.service";

const DiskioContainer = new Container();

DiskioContainer.bind<DiskioController>(DiskioController).toSelf();
DiskioContainer.bind<DiskioService>(DiskioService).toSelf();
DiskioContainer.bind<DiskioRepository>(DiskioRepository).toSelf();

export { DiskioContainer, DiskioController };
