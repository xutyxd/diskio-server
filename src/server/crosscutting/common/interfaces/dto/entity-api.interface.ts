import { IEntityAPIData, IEntityData } from "../data";

export interface IEntityAPI<A = IEntityAPIData, D = IEntityData> extends IEntityAPIData {
    toApi: () => A;
    toDomain: () => D;
}