import { Container } from "inversify";

import { DiskIOController } from "./controllers/diskio.controller";
import { DiskIORepository } from "./repository/diskio.repository";
import { DiskIOService } from "./services/diskio.service";

const DiskIOContainer = new Container();

DiskIOContainer.bind<DiskIOController>(DiskIOController).toSelf();
DiskIOContainer.bind<DiskIOService>(DiskIOService).toSelf();
DiskIOContainer.bind<DiskIORepository>(DiskIORepository).toSelf();

export { DiskIOContainer, DiskIOController };
