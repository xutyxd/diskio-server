import { IEntityData } from "../../../crosscutting/common/interfaces/data";
import { IDiskioChunkData } from "../../../diskio-chunk/interfaces/data";

export interface IDiskioFileData extends IEntityData {
    name: string;
    chunks: (IDiskioChunkData & { index: number })[]; // Full copy
    size: number;
    original: number;
}
