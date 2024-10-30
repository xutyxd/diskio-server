
import { Container } from "inversify";
import { EntityController } from "./controllers/entity.controller";
import { EntityRepositoryService, EntityService } from "./services";
import { LogService } from "./services/log.service";

const CommonContainer = new Container();

CommonContainer.bind<LogService>(LogService).toSelf().inSingletonScope();

export { CommonContainer, EntityController, EntityRepositoryService, EntityService };
