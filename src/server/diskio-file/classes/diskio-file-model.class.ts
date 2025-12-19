import { EntityModel } from "../../crosscutting/common/classes";
import { DiskioChunk, DiskioChunkModel } from "../../diskio-chunk/classes";
import { IDiskioFileData, IDiskioFileModelData } from "../interfaces/data";
import { IDiskioFileModel } from "../interfaces/dto";

export class DiskioFileModel extends EntityModel implements IDiskioFileModel {

    public name;
    public chunks;
    public size;
    public original;

    constructor(data: IDiskioFileModelData) {
        super(data);

        this.name = data.name;
        // Sort chunks to forget the index
        const sorted = (data.chunks || []).sort((a, b) => a.index - b.index);
        // Transform chunks
        this.chunks = sorted.map((chunk) => new DiskioChunkModel(chunk));
        this.size = data.size;
        this.original = data.original;
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

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            name: this.name,
            chunks: this.chunks.map((chunk, index) => ({ ...chunk.toRepository(), index })),
            size: this.size,
            original: this.original
        };
    }

    public static fromDomain(entity: IDiskioFileData) {
        const base = super.fromDomain(entity);

        return new DiskioFileModel({
            ...base,
            name: entity.name,
            chunks: entity.chunks.map((chunk) => ({ ...new DiskioChunk(chunk).toModel(), index: chunk.index })),
            size: entity.size,
            original: entity.original
        });
    }

    public static fromRepository(entity: IDiskioFileModelData) {
        const base = super.fromRepository(entity);

        return new DiskioFileModel({
            ...base,
            name: entity.name,
            chunks: entity.chunks.map((chunk) => ({ ...DiskioChunkModel.fromRepository(chunk), index: chunk.index })),
            size: entity.size,
            original: entity.original
        });
    }
}
