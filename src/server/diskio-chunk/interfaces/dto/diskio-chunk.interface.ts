import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IDiskioChunkAPIData, IDiskioChunkData, IDiskioChunkModelData } from "../data";

export interface IDiskioChunk extends IEntity<IDiskioChunkAPIData, IDiskioChunkData, IDiskioChunkModelData> { }
