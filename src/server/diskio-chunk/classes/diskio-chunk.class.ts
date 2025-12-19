import { Entity } from "../../crosscutting/common/classes";
import { IDiskioChunkAPIData, IDiskioChunkData, IDiskioChunkModelData } from "../interfaces/data";
import { IDiskioChunk } from "../interfaces/dto";

export class DiskioChunk extends Entity implements IDiskioChunk {

    public hash: string;
    public size: number;
    public original: number;
    public refs: number;

    constructor(data: Partial<IDiskioChunkData>) {
        super(data);

        this.hash = data.hash || '';
        this.size = data.size || 0;
        this.original = data.original || 0;
        this.refs = data.refs || 0;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            hash: this.hash,
            size: this.size,
            original: this.original,
            refs: this.refs
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            hash: this.hash,
            size: this.size,
            original: this.original,
            refs: this.refs
        };
    }

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            hash: this.hash,
            size: this.size,
            original: this.original,
            refs: this.refs
        };
    }

    public static fromAPI(entity: IDiskioChunkAPIData) {
        return new DiskioChunk(entity);
    }

    public static fromModel(entity: IDiskioChunkModelData) {
        const base = super.fromModel(entity);

        return new DiskioChunk({
            ...base,
            hash: entity.hash,
            size: entity.size,
            original: entity.original,
            refs: entity.refs
        });
    }
}
