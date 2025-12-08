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
import { IDatabaseStatic } from './crosscutting/database/interfaces';

import { HealthCheckContainer, HealthCheckController } from "./crosscutting/health-check";
import { DiskioContainer, DiskioController } from './diskio';


class App {
    private appContainer;
    public server: HTTPServer;

    constructor() {
        const start = new Date().getTime();

        // Containers
        const [container, ...containers] = [
            ConfigurationContainer,
            HealthCheckContainer,
            CommonContainer,
            DiskioContainer
        ];
        // Merge containers
        const appContainer = Container.merge(container, ...containers);
        // Skip base class checks
        appContainer.options = { skipBaseClassChecks: true };
        // Save ref of container
        this.appContainer = appContainer;

        const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
        const httpServer = new HTTPServer(port, Response);
        // Set API to be able to call it from anywhere
        httpServer.headers.add({
            key: "Access-Control-Allow-origin",
            value: "*"
        });
        this.server = httpServer;

        console.log(`App started in ${new Date().getTime() - start}ms`);
    }

    public set = {
        // auth: () => {
        //     const appContainer = this.appContainer;
        //     // Actions pre-request
        //     const setAuthAction = appContainer.get(SetAuthAction);
        //     // Set actions before request
        //     this.server.request.before.add(setAuthAction);
        // },
        database: (database: IDatabaseStatic = MemoryDatabaseService, configuration?: unknown) => {
            const appContainer = this.appContainer;
            // Set database
            appContainer.bind<IDatabase<unknown & IEntityModelData>>('IDatabase').to(database).inSingletonScope();
            // Get database
            const databaseService = appContainer.get<IDatabase<unknown & IEntityModelData>>('IDatabase');
            databaseService.connection.open(configuration);
        }
    }

    public start = () => {
        const appContainer = this.appContainer;
        const httpServer = this.server;
        // Check database
        try {
            appContainer.get<IDatabase<unknown & IEntityModelData>>('IDatabase');
        } catch {
            // Set memory database
            this.set.database();
        }
        // Services
        const configurationService = appContainer.get(ConfigurationService);
        // Set keys for cookies
        // httpServer.keys = (configurationService.keys.cookies()) as string[];
        // Controllers
        const healthCheckController = appContainer.get(HealthCheckController);
        const diskioController = appContainer.get(DiskioController);
        // Set controllers
        httpServer.controllers.add(healthCheckController);
        httpServer.controllers.add(diskioController);
    }
}

export { App };
