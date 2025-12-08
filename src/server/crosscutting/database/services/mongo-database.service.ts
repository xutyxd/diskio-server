import { injectable } from "inversify";
import { Db, MongoClient, Filter } from "mongodb";
import { IEntityModelData } from "../../common/interfaces/data";
import { IDatabase, IDbQueryWhere, IIndexDbQueryWhere } from "../interfaces";
import { InternalError, NotFoundError } from "../../common/errors";
import { DbWhereOperands } from "../enums/db-where-operands.enum";

@injectable()
export class MongoDatabaseService <MD extends IEntityModelData> implements IDatabase<MD> {

    private connected: boolean = false;
    private mongoClient?: MongoClient;
    private db?: Db;

    public connection = {
        get connected(): boolean {
            return this.connected;
        },
        open: async (configuration: { uri: string, database: string }) => {
            const { uri, database } = configuration;
            const client = new MongoClient(uri);

            try {
                await client.connect();
                this.db = client.db(database);
                this.connected = true;
                this.mongoClient = client;
            } catch (error) {
                console.log('Error connecting to database: ', error);
            }
        },
        close: async () => {
            await this.mongoClient?.close();
            this.connected = false;
        }
    }

    constructor() { }

    public table = {
        create: async (from: string) => {
            if (!this.connected || !this.db) {
                throw new InternalError('Database not connected');
            }

            await this.db.createCollection(from);
        },
        drop: async (from: string) => {
            if (!this.connected || !this.db) {
                throw new InternalError('Database not connected');
            }

            const collection = this.db.collection(from);
            await collection.drop();
        }
    }

    public async insert(from: string, data: MD): Promise<MD> {
        if (!this.connected || !this.db) {
            throw new InternalError('Database not connected');
        }

        const collection = this.db.collection(from);
        const inserted = await collection.insertOne(data);
        
        const getted = await this.get(from, { A: 'uuid', B: inserted.insertedId.toString(), op: DbWhereOperands.EQUALS });
        
        return getted;
    }

    public async get(from: string, toIndex: IIndexDbQueryWhere<MD>): Promise<MD> {
        if (!this.connected || !this.db) {
            throw new InternalError('Database not connected');
        }
        
        const { A: property, B: value } = toIndex;
        const collection = this.db.collection<MD>(from);
        const filter = { [property as keyof MD]: value as MD[keyof MD] } as Filter<MD>;
        const queried = await collection.findOne(filter);

        return queried as MD;
    }

    public async list(from: string, wheres: IDbQueryWhere<MD>[]): Promise<MD[]> {
        if (!this.connected || !this.db) {
            throw new InternalError('Database not connected');
        }

        const collection = this.db.collection<MD>(from);
        const filters = wheres.reduce((filters, { A: property, B, op }) => {
            let value;

            if (op === DbWhereOperands.EQUALS) {
                value = B;
            } else if (op === DbWhereOperands.NOTEQUALS) {
                value = { $ne: B };
            } else if (op === DbWhereOperands.IN) {
                value = { $in: B };
            } else if (op === DbWhereOperands.NOTIN) {
                value = { $nin: B };
            } else if (op === DbWhereOperands.IS) {
                value = { $eq: B };
            } else if (op === DbWhereOperands.ISNOT) {
                value = { $ne: B };
            } else if (op === DbWhereOperands.LIKE) {
                value = { $regex: B };
            } else if (op === DbWhereOperands.NOTLIKE) {
                value = { $not: { $regex: B } };
            } else if (op === DbWhereOperands.ALL) {
                value = { $all: B };
            }

            const filter = { [property as keyof MD]: value as MD[keyof MD] } as Filter<MD>;
            return { ...filters, ...filter };
        }, {} as Filter<MD>);

        const queried = await collection.find(filters).toArray();

        return queried as MD[];
    }

    public async update(from: string, toIndex: IIndexDbQueryWhere<MD>, data: Partial<MD>): Promise<MD> {
        if (!this.connected || !this.db) {
            throw new InternalError('Database not connected');
        }

        const { A: property, B: value } = toIndex;
        const collection = this.db.collection<MD>(from);
        const filter = { [property as keyof MD]: value as MD[keyof MD] } as Filter<MD>;
        const updated = await collection.findOneAndUpdate(filter, { $set: data });
        
        if (!updated) {
            throw new NotFoundError('Record not found');
        }

        return updated as MD;
    }

    public async delete(from: string, toIndex: IIndexDbQueryWhere<MD>): Promise<MD> {
        if (!this.connected || !this.db) {
            throw new InternalError('Database not connected');
        }

        const { A: property, B: value } = toIndex;
        const collection = this.db.collection<MD>(from);
        const filter = { [property as keyof MD]: value as MD[keyof MD] } as Filter<MD>;
        const deleted = await collection.findOneAndDelete(filter);

        if (!deleted) {
            throw new NotFoundError('Record not found');
        }

        return deleted as MD;
    }
}