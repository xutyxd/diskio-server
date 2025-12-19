import { inject, injectable } from 'inversify';
import { IHTTPController } from 'server-over-express';
import { EntityController } from '../../crosscutting/common';
import { IDiskioChunkAPIData, IDiskioChunkData, IDiskioChunkModelData } from '../interfaces/data';
import { DiskioChunkService } from '../services/diskio-chunk.service';
import { DiskioChunkAPI } from '../classes';

@injectable()
export class DiskioChunkController extends EntityController<IDiskioChunkAPIData, IDiskioChunkData, IDiskioChunkModelData> implements IHTTPController {

    public path = 'diskio-chunk';

    constructor(@inject(DiskioChunkService) readonly diskioChunkService: DiskioChunkService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/diskio-chunk-base.request'
        };

        super(diskioChunkService, schemas, DiskioChunkAPI);
    }
}
