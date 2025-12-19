import { EntityAPI } from "../../crosscutting/common/classes";
import { IDiskioChunkAPIData, IDiskioChunkData } from "../interfaces/data";
import { IDiskioChunkAPI } from "../interfaces/dto";

export class DiskioChunkAPI extends EntityAPI implements IDiskioChunkAPI {
    
    public hash: string;
    public size: number;
    public original: number;
    public refs: number;

    constructor(data: IDiskioChunkAPIData) {
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

    public static fromDomain(entity: IDiskioChunkData) {
        return new DiskioChunkAPI({ ...entity });
    }
}
