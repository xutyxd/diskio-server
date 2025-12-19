import { Container } from "inversify";

import { DiskioFileController } from "./controllers/diskio-file.controller";
import { DiskioFileRepository } from "./repository/diskio-file.repository";
import { DiskioFileService } from "./services/diskio-file.service";

const DiskioFileContainer = new Container();

DiskioFileContainer.bind<DiskioFileController>(DiskioFileController).toSelf();
DiskioFileContainer.bind<DiskioFileService>(DiskioFileService).toSelf();
DiskioFileContainer.bind<DiskioFileRepository>(DiskioFileRepository).toSelf();

export { DiskioFileContainer, DiskioFileController };
