import { EntityAPI } from "../../crosscutting/common/classes";
import { ForbiddenError } from "../../crosscutting/common/errors/forbidden.error";
import { DiskioChunkAPI } from "../../diskio-chunk/classes";
import { IDiskioFileAPIData, IDiskioFileData } from "../interfaces/data";
import { IDiskioFileAPI } from "../interfaces/dto";
import { DiskioFile } from "./diskio-file.class";

export class DiskioFileAPI extends EntityAPI implements IDiskioFileAPI {
    
    public name;
    public size;
    public original;

    constructor(data: IDiskioFileAPIData) {
        super(data);

        this.name = data.name;
        this.size = data.size;
        this.original = data.original;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            name: this.name,
            size: this.size,
            original: this.original
        };
    }

    public toDomain(): IDiskioFileData {
        throw new ForbiddenError('Forbidden.');
    }

    public static fromDomain(entity: IDiskioFileData) {
        return new DiskioFileAPI({ ...entity });
    }
}
