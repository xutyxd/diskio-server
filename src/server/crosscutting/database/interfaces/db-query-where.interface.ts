import { DbWhereOperands } from "../enums/db-where-operands.enum";
import { DbOperands } from "../enums/db-operands.enum";
import { DbTypes } from "../enums/db-types.enum";
export interface IDbQueryWhere<T> {
    A: keyof T;
    B: unknown;
    op: DbWhereOperands;
    union?: DbOperands;
    type?: DbTypes;
}