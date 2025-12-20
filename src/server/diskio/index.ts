import { Container } from "inversify";

import { DiskIOController } from "./controllers/diskio.controller";
import { DiskIOService } from "./services/diskio.service";

const DiskIOContainer = new Container();

DiskIOContainer.bind<DiskIOController>(DiskIOController).toSelf();
DiskIOContainer.bind<DiskIOService>(DiskIOService).toSelf();

export { DiskIOContainer, DiskIOController };
