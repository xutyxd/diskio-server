import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common/services";
import { DiskioFile } from "../classes/diskio-file.class";
import { IDiskioFileAPIData, IDiskioFileData, IDiskioFileModelData } from "../interfaces/data";
import { DiskioFileRepository } from "../repository/diskio-file.repository";

@injectable()
export class DiskioFileService extends EntityService<IDiskioFileAPIData, IDiskioFileData, IDiskioFileModelData> {

    constructor(@inject(DiskioFileRepository) readonly diskioFile: DiskioFileRepository) {
        super(diskioFile, DiskioFile);
    }
}
