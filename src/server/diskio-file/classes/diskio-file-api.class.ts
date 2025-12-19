import { EntityAPI } from "../../crosscutting/common/classes";
import { DiskioChunkAPI } from "../../diskio-chunk/classes";
import { IDiskioFileAPIData, IDiskioFileData } from "../interfaces/data";
import { IDiskioFileAPI } from "../interfaces/dto";

export class DiskioFileAPI extends EntityAPI implements IDiskioFileAPI {
    
    public name;
    public chunks;
    public size;
    public original;

    constructor(data: IDiskioFileAPIData) {
        super(data);

        this.name = data.name;
        // Sort chunks to forget the index
        const sorted = (data.chunks || []).sort((a, b) => a.index - b.index);
        // Transform chunks
        this.chunks = sorted.map((chunk) => new DiskioChunkAPI(chunk));
        this.size = data.size;
        this.original = data.original;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            name: this.name,
            chunks: this.chunks.map((chunk, index) => ({ ...chunk.toApi(), index })), 
            size: this.size,
            original: this.original
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            name: this.name,
            chunks: this.chunks.map((chunk, index) => ({ ...chunk.toDomain(), index })),
            size: this.size,
            original: this.original
        };
    }

    public static fromDomain(entity: IDiskioFileData) {
        return new DiskioFileAPI({ ...entity });
    }
}
