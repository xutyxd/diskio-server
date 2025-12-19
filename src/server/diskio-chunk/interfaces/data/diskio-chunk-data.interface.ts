import { IEntityData } from "../../../crosscutting/common/interfaces/data";

export interface IDiskioChunkData extends IEntityData {
    hash: string;
    size: number;
    original: number;
    refs: number;
}
