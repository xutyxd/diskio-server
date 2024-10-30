import { IEntityAPIData, IEntityData } from "../data";
import { IEntityAPI } from "../dto";

export interface IEntityAPIStatic<A extends IEntityAPIData, D extends IEntityData> {
    new (record: A): IEntityAPI<A, D>;
    
    fromDomain: (record: D) => IEntityAPI<A, D>;
}