import { IEntityData, IEntityModelData } from "../data";

export interface IEntityModel<D = IEntityData, M = IEntityModelData> extends IEntityModelData {
    toDomain: () => D;
    toRepository: () => M;
}