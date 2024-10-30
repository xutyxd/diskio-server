import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { DiskioModel } from "../classes";
import { IDiskioData, IDiskioModelData } from "../interfaces/data";

@injectable()
export class DiskioRepository extends EntityRepositoryService<IDiskioData, IDiskioModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IDiskioModelData>) {
        const table = 'diskio';
        super(dataBaseService, table, DiskioModel);
    }
}
