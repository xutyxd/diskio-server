import { EntityModel } from "../../crosscutting/common/classes";
import { IDiskioChunkData, IDiskioChunkModelData } from "../interfaces/data";
import { IDiskioChunkModel } from "../interfaces/dto";

export class DiskioChunkModel extends EntityModel implements IDiskioChunkModel {

    public hash: string;
    public size: number;
    public original: number;
    public refs: number;

    constructor(data: IDiskioChunkModelData) {
        super(data);

        this.hash = data.hash || '';
        this.size = data.size || 0;
        this.original = data.original || 0;
        this.refs = data.refs || 0;
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

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            hash: this.hash,
            size: this.size,
            original: this.original,
            refs: this.refs
        };
    }

    public static fromDomain(entity: IDiskioChunkData) {
        const base = super.fromDomain(entity);

        return new DiskioChunkModel({
            ...base,
            hash: entity.hash,
            size: entity.size,
            original: entity.original,
            refs: entity.refs
        });
    }

    public static fromRepository(entity: IDiskioChunkModelData) {
        const base = super.fromRepository(entity);

        return new DiskioChunkModel({
            ...base,
            hash: entity.hash,
            size: entity.size,
            original: entity.original,
            refs: entity.refs
        });
    }
}
