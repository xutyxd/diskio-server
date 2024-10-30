import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common/services";
import { Diskio } from "../classes/diskio.class";
import { IDiskioAPIData, IDiskioData, IDiskioModelData } from "../interfaces/data";
import { DiskioRepository } from "../repository/diskio.repository";

@injectable()
export class DiskioService extends EntityService<IDiskioAPIData, IDiskioData, IDiskioModelData> {

    constructor(@inject(DiskioRepository) readonly diskio: DiskioRepository) {
        super(diskio, Diskio);
    }
}
