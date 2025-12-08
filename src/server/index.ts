
import { App } from "./app";
import { IDatabaseStatic } from "./crosscutting/database/interfaces";
import { MemoryDatabaseService } from "./crosscutting/database/services/memory-database.service";
import { MongoDatabaseService } from "./crosscutting/database/services/mongo-database.service";

const app = new App();

let database: IDatabaseStatic = MemoryDatabaseService;
let configuration: unknown;
// Check if mongodb is available
const { MONGODB_URI, MONGODB_DATABASE } = process.env;

if (MONGODB_URI && MONGODB_DATABASE) {
    database = MongoDatabaseService;
    configuration = {
        uri: process.env.MONGODB_URI,
        database: process.env.MONGODB_DATABASE
    }
}

app.set.database(database, configuration);

app.start();

export default app;