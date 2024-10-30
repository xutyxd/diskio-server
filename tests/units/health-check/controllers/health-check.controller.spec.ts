import "reflect-metadata";

import assert from "node:assert";
import { describe, it, after } from "node:test";
import { MemoryDatabaseService } from "../../../../src/server/crosscutting/database/services/memory-database.service";
import { HealthCheckController } from "../../../../src/server/crosscutting/health-check/controllers/health-check.controller";
import { IHealthCheckModelData } from "../../../../src/server/crosscutting/health-check/interfaces/data";
import { HealthCheckRepository } from "../../../../src/server/crosscutting/health-check/repository/health-check.repository";
import { HealthCheckService } from "../../../../src/server/crosscutting/health-check/services/health-check.service";

describe('HealthCheckController', () => {

    describe('HealthCheckController constructor', () => {
        it('it should instance', () => {
            let instance: HealthCheckController | Error;

            try {
                const database = new MemoryDatabaseService<IHealthCheckModelData>();
                database.connection.open();
                const repository = new HealthCheckRepository(database);
                const service = new HealthCheckService(repository);

                instance = new HealthCheckController(service);
            } catch (e) {
                instance = e as Error;
            }

            assert.equal(instance instanceof HealthCheckController, true);
        });

        after(() => {
            process.emit('SIGTERM');
        });
    });
});