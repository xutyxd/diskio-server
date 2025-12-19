import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface IDiskioChunkAPIData extends IEntityAPIData {
    hash: string;
    size: number;
    original: number;
    refs: number;
}
