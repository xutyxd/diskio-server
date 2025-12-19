import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";
import { IDiskioChunkModelData } from "../../../diskio-chunk/interfaces/data";

export interface IDiskioFileModelData extends IEntityModelData {
    name: string;
    chunks: (IDiskioChunkModelData & { index: number })[]; // Full copy
    size: number;
    original: number;
}
