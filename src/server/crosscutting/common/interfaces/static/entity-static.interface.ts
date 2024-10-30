import { IEntityAPIData, IEntityData, IEntityModelData } from "../data";
import { IEntity } from "../dto";

export interface IEntityStatic<A extends IEntityAPIData, D extends IEntityData, M extends IEntityModelData> {
    new (record: Partial<D>): IEntity<A, D, M>;
    
    fromModel: (record: M) => IEntity<A, D, M>;
    fromAPI: (record: A) => IEntity<A, D, M>;
}