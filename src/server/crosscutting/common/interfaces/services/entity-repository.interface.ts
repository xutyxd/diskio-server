import { IDbQueryWhere, IIndexDbQueryWhere } from "../../../database/interfaces";
import { IEntityModelData } from "../data/";

export interface IEntityRepository<MD extends IEntityModelData = IEntityModelData> {
    insert(data: MD): Promise<MD>;
    get(index: IIndexDbQueryWhere<MD>): Promise<MD>;
    list(where?: IDbQueryWhere<MD>[]): Promise<MD[]>;
    update(index: IIndexDbQueryWhere<MD>, data: MD): Promise<MD>;
    delete(index: IIndexDbQueryWhere<MD>): Promise<MD>;
}