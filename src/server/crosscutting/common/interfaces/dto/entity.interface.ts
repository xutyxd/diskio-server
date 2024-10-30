import { IEntityAPIData, IEntityData, IEntityModelData } from "../data";

export interface IEntity<A = IEntityAPIData, D = IEntityData, M = IEntityModelData> extends IEntityData {
    toApi: () => A;
    toDomain: () => D;
    toModel: () => M;
}