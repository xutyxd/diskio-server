import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface IDiskioChunkModelData extends IEntityModelData {
    hash: string;
    size: number;
    original: number;
    refs: number;
}
