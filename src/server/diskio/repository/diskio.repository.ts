import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { DiskIOModel } from "../classes";
import { IDiskIOData, IDiskIOModelData } from "../interfaces/data";

@injectable()
export class DiskIORepository extends EntityRepositoryService<IDiskIOData, IDiskIOModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IDiskIOModelData>) {
        const table = 'diskIO';
        super(dataBaseService, table, DiskIOModel);
    }
}
