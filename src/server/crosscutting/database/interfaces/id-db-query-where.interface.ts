import { DbWhereOperands } from "../enums/db-where-operands.enum";
import { IDbQueryWhere } from "./db-query-where.interface";

export interface IIndexDbQueryWhere<T> extends Omit<IDbQueryWhere<T>, 'union' | 'type'> {
    A: keyof T;
    B: number | string;
    op: DbWhereOperands.EQUALS;
}