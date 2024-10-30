import { IEntityModelData } from "../../common/interfaces/data";
import { DbWhereOperands } from "../enums/db-where-operands.enum";
import { IIndexDbQueryWhere } from "../interfaces";

export class UUIDDbQueryWhere<T extends IEntityModelData> implements IIndexDbQueryWhere<T> {

    public A = 'uuid' as keyof T;
    public B: string;
    public op: DbWhereOperands.EQUALS = DbWhereOperands.EQUALS;

    constructor(B: string) {
        this.B = B;
    }
}