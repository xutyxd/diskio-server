import { Container } from "inversify";

import { DiskioFileRepository } from "./repository/diskio-file.repository";
import { DiskioFileService } from "./services/diskio-file.service";

const DiskioFileContainer = new Container();

DiskioFileContainer.bind<DiskioFileService>(DiskioFileService).toSelf();
DiskioFileContainer.bind<DiskioFileRepository>(DiskioFileRepository).toSelf();

export { DiskioFileContainer };
