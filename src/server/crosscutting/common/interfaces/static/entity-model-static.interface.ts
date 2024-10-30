import { IEntityData, IEntityModelData } from "../data";
import { IEntityModel } from "../dto";

export interface IEntityModelStatic<D extends IEntityData, M extends IEntityModelData> {
    new (data: M): IEntityModel<D, M>;

    fromDomain: (data: D) => IEntityModel<D, M>;
    fromRepository: (data: M) => IEntityModel<D, M>;
}