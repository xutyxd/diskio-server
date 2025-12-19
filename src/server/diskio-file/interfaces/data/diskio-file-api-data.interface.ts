import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";
import { IDiskioChunkAPIData } from "../../../diskio-chunk/interfaces/data";

export interface IDiskioFileAPIData extends IEntityAPIData {
    name: string;
    chunks: (IDiskioChunkAPIData & { index: number })[]; // Full copy
    size: number;
    original: number;
}
