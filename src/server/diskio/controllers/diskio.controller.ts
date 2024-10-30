import { inject, injectable } from 'inversify';
import { IHTTPController } from 'server-over-express';
import { EntityController } from '../../crosscutting/common';
import { IDiskioAPIData, IDiskioData, IDiskioModelData } from '../interfaces/data';
import { DiskioService } from '../services/diskio.service';
import { DiskioAPI } from '../classes';

@injectable()
export class DiskioController extends EntityController<IDiskioAPIData, IDiskioData, IDiskioModelData> implements IHTTPController {

    public path = 'diskio';

    constructor(@inject(DiskioService) readonly diskioService: DiskioService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/diskio-base.request'
        };

        super(diskioService, schemas, DiskioAPI);
    }
}
