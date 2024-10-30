import 'reflect-metadata';

import { Container } from "inversify";
import { HTTPServer } from "server-over-express";

import { ConfigurationContainer } from "./configuration";
import { ConfigurationService } from "./configuration/services/configuration.service";
import { CommonContainer } from './crosscutting/common';
import { IEntityModelData } from './crosscutting/common/interfaces/data';
import { Response } from "./crosscutting/common/responses/response.class";
import { IDatabase } from './crosscutting/database/interfaces/database.interface';
import { MemoryDatabaseService } from './crosscutting/database/services/memory-database.service';
import { HealthCheckContainer, HealthCheckController } from "./crosscutting/health-check";

const App = class {
    public server: HTTPServer;

    constructor() {
        const start = new Date().getTime();

        // Containers
        const [container, ...containers] = [
            ConfigurationContainer,
            HealthCheckContainer,
            CommonContainer,
        ];
        // Merge containers
        const appContainer = Container.merge(container, ...containers);
        // Skip base class checks
        appContainer.options = { skipBaseClassChecks: true };
        // Services
        const configurationService = appContainer.get(ConfigurationService);
        // Set database
        appContainer.bind<IDatabase<unknown & IEntityModelData>>('IDatabase').to(MemoryDatabaseService).inSingletonScope();
        // Get database
        const databaseService = appContainer.get<IDatabase<unknown & IEntityModelData>>('IDatabase');
        databaseService.connection.open();
        // Controllers
        const healthCheckController = appContainer.get(HealthCheckController);

        const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
        const httpServer = new HTTPServer(port, Response);
        // Set API to be able to call it from anywhere
        httpServer.headers.add({
            key: "Access-Control-Allow-origin",
            value: "*"
        });
        // Set keys for cookies
        httpServer.keys = (configurationService.keys.cookies()) as string[];
        // Set actions
        // Set actions before request
        // Set actions after request
        // Set controllers
        httpServer.controllers.add(healthCheckController);
        this.server = httpServer;

        console.log(`App started in ${new Date().getTime() - start}ms`);
    }
}

export { App };
