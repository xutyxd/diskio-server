import { Entity } from "../../crosscutting/common/classes";
import { ForbiddenError } from "../../crosscutting/common/errors/forbidden.error";
import { DiskioChunk } from "../../diskio-chunk/classes";
import { IDiskioFileAPIData, IDiskioFileData, IDiskioFileModelData } from "../interfaces/data";
import { IDiskioFile } from "../interfaces/dto";

export class DiskioFile extends Entity implements IDiskioFile {

    public name;
    public chunks;
    public size;
    public original;

    constructor(data: Partial<IDiskioFileData>) {
        super(data);

        this.name = data.name || crypto.randomUUID();
        // Sort chunks to forget the index
        const sorted = (data.chunks || []).sort((a, b) => a.index - b.index);
        // Transform chunks
        this.chunks = sorted.map((chunk) => new DiskioChunk(chunk));
        // Calculate sizes
        const size = this.chunks.reduce((total, chunk) => total + chunk.size, 0);
        const original = this.chunks.reduce((total, chunk) => total + chunk.original, 0);
        // Set sizes
        this.size = size || data.size || 0;
        this.original = original || data.original || 0;
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

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            name: this.name,
            chunks: this.chunks.map((chunk, index) => ({ ...chunk.toModel(), index})),
            size: this.size,
            original: this.original
        };
    }

    public static fromAPI(entity: IDiskioFileAPIData): DiskioFile {
        throw new ForbiddenError('Forbidden.');
    }

    public static fromModel(entity: IDiskioFileModelData) {
        const base = super.fromModel(entity);
        // Transform chunks
        const chunks = entity.chunks.map((chunk) => ({ ...DiskioChunk.fromModel(chunk).toDomain(), index: chunk.index }));

        return new DiskioFile({
            ...base,
            name: entity.name,
            chunks,
            size: entity.size,
            original: entity.original
        });
    }
}
