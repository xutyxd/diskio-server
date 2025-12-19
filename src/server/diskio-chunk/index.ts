import { Container } from "inversify";

import { DiskioChunkController } from "./controllers/diskio-chunk.controller";
import { DiskioChunkRepository } from "./repository/diskio-chunk.repository";
import { DiskioChunkService } from "./services/diskio-chunk.service";

const DiskioChunkContainer = new Container();

DiskioChunkContainer.bind<DiskioChunkController>(DiskioChunkController).toSelf();
DiskioChunkContainer.bind<DiskioChunkService>(DiskioChunkService).toSelf();
DiskioChunkContainer.bind<DiskioChunkRepository>(DiskioChunkRepository).toSelf();

export { DiskioChunkContainer, DiskioChunkController };
