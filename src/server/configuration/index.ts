import { Container } from "inversify";

import { ConfigurationService } from "./services/configuration.service";

const ConfigurationContainer = new Container();

ConfigurationContainer.bind<ConfigurationService>(ConfigurationService).toSelf();

export { ConfigurationContainer };