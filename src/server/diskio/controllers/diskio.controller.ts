import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController } from 'server-over-express';
import { DiskioService } from '../services/diskio.service';
import { NotFoundError } from '../../crosscutting/common/errors';
import { InternalErrorResponse, NotFoundResponse } from '../../crosscutting/common/responses';

@injectable()
export class DiskioController implements IHTTPController {

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

    constructor(@inject(DiskioService) readonly diskioService: DiskioService) { }

    public async upload(request: HTTPRequest, context: IHTTPContextData) {
        const files = await this.diskioService.upload(request, context);

        return files;
    }

    public async download(request: HTTPRequest, context: IHTTPContextData) {
        try {
            const { params: path } = request;

            const file = await this.diskioService.download(path[0]);
    
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

            await this.diskioService.delete(path[0]);

            return;
        } catch (error) {

            if (error instanceof NotFoundError) {
                throw new NotFoundResponse(error.message, context);
            }

            throw new InternalErrorResponse('Unknown error', context);
        }
    }
}
