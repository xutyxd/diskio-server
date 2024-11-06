import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController } from 'server-over-express';
import { DiskioService } from '../services/diskio.service';

@injectable()
export class DiskioController implements IHTTPController {

    public path = 'diskio';
    public handlers = [
        {
            path: { method: HttpMethodEnum.POST },
            action: this.upload.bind(this)
        }
    ];

    constructor(@inject(DiskioService) readonly diskioService: DiskioService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/diskio-base.request'
        };
    }

    public async upload(request: HTTPRequest, context: IHTTPContextData) {
        const files = await this.diskioService.upload(request, context);

        return files;
    }
}
