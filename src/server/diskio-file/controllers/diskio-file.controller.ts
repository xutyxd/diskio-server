import { inject, injectable } from 'inversify';
import { IHTTPController } from 'server-over-express';
import { EntityController } from '../../crosscutting/common';
import { IDiskioFileAPIData, IDiskioFileData, IDiskioFileModelData } from '../interfaces/data';
import { DiskioFileService } from '../services/diskio-file.service';
import { DiskioFileAPI } from '../classes';

@injectable()
export class DiskioFileController extends EntityController<IDiskioFileAPIData, IDiskioFileData, IDiskioFileModelData> implements IHTTPController {

    public path = 'diskio-file';

    constructor(@inject(DiskioFileService) readonly diskioFileService: DiskioFileService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/diskio-file-base.request'
        };

        super(diskioFileService, schemas, DiskioFileAPI);
    }
}
