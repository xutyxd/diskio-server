import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { DiskioFileModel } from "../classes";
import { IDiskioFileData, IDiskioFileModelData } from "../interfaces/data";

@injectable()
export class DiskioFileRepository extends EntityRepositoryService<IDiskioFileData, IDiskioFileModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IDiskioFileModelData>) {
        const table = 'diskio-file';
        super(dataBaseService, table, DiskioFileModel);
    }
}
