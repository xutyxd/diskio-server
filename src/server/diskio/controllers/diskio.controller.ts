import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController } from 'server-over-express';
import { DiskIOService } from '../services/diskio.service';
import { NotFoundError } from '../../crosscutting/common/errors';
import { InternalErrorResponse, NotFoundResponse } from '../../crosscutting/common/responses';
import { IDiskioFileAPIData } from '../../diskio-file/interfaces/data';

@injectable()
export class DiskIOController implements IHTTPController {

    public path = 'diskio';
    public handlers = [
        {
            path: { method: HttpMethodEnum.POST },
            action: this.upload.bind(this)
        },
        {
            path: { method: HttpMethodEnum.GET, relative: '*' },
            action: this.download.bind(this)
        },
        {
            path: { method: HttpMethodEnum.DELETE, relative: '*' },
            action: this.delete.bind(this)
        }
    ];

    constructor(@inject(DiskIOService) readonly diskIOService: DiskIOService) { }

    public async upload(request: HTTPRequest, context: IHTTPContextData) {
        let files: IDiskioFileAPIData[] = [];

        try {
            files = await this.diskIOService.upload(request, context);
        } catch (error) {
            throw new InternalErrorResponse('Unknown error', context);
        }

        return files;
    }

    public async download(request: HTTPRequest, context: IHTTPContextData) {
        try {
            const { params: path } = request;

            const file = await this.diskIOService.download(path[0]);
    
            context.stream = file;
        } catch (error) {

            if (error instanceof NotFoundError) {
                throw new NotFoundResponse(error.message, context);
            }

            throw new InternalErrorResponse('Unknown error', context);
        }
    }

    public async delete(request: HTTPRequest, context: IHTTPContextData) {
        try {
            const { params: path } = request;

            await this.diskIOService.delete(path[0]);

            return;
        } catch (error) {

            if (error instanceof NotFoundError) {
                throw new NotFoundResponse(error.message, context);
            }

            throw new InternalErrorResponse('Unknown error', context);
        }
    }
}
