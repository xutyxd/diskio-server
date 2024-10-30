import { IEntityModelData } from "../../common/interfaces/data";
import { IDatabase } from "./database.interface";

export interface IDatabaseStatic {
    new (...args: any[]): IDatabase<IEntityModelData>
}