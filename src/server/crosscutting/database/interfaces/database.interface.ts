import { IEntityModelData } from "../../common/interfaces/data";
import { IDbQueryWhere } from "./db-query-where.interface";
import { IIndexDbQueryWhere } from "./id-db-query-where.interface";

export interface IDatabase<MD extends IEntityModelData> {
    // Connection
    connection: {
        connected: boolean;
        open(configuration?: unknown): Promise<void> | void;
        close(): Promise<void>;
    };
    // CRUD
    insert(from: string, data: MD): Promise<MD>;
    get(from: string, index: IIndexDbQueryWhere<MD>): Promise<MD | undefined>;
    list(from: string, where: IDbQueryWhere<MD>[]): Promise<MD[]>;
    update(from: string, index: IIndexDbQueryWhere<MD>, data: Partial<MD>): Promise<MD>;
    delete(from: string, index: IIndexDbQueryWhere<MD>): Promise<MD>;
}