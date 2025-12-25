import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController } from 'server-over-express';
import { DiskIOFileSmartReadable } from 'diskio-core';

import { DiskIOService } from '../services/diskio.service';
import { NotFoundError } from '../../crosscutting/common/errors';
import { InternalErrorResponse, NotFoundResponse, StreamResponse } from '../../crosscutting/common/responses';
import { IDiskioFileAPIData } from '../../diskio-file/interfaces/data';
import { DiskioFileService } from '../../diskio-file/services/diskio-file.service';
import { DiskioFileAPI } from '../../diskio-file/classes';

@injectable()
export class DiskIOController implements IHTTPController {

    public path = 'diskio';
    public handlers = [
        {
            path: { method: HttpMethodEnum.POST },
            action: this.upload.bind(this)
        },
        {
            path: { method: HttpMethodEnum.GET },
            action: this.list.bind(this)
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

    constructor(@inject(DiskIOService) readonly diskIOService: DiskIOService,
                @inject(DiskioFileService) readonly diskioFileService: DiskioFileService) { }

    public async upload(request: HTTPRequest, context: IHTTPContextData) {
        let files: IDiskioFileAPIData[] = [];

        try {
            const uploaded = await this.diskIOService.upload(request, context);
            // Transform to API data
            files = uploaded.map((file) => new DiskioFileAPI(file).toApi());
        } catch (error) {
            throw new InternalErrorResponse('Unknown error', context);
        }

        return files;
    }

    public async list(request: HTTPRequest, context: IHTTPContextData) {
        try {
            // Get all files with no filters
            const files = await this.diskioFileService.list([], context);
            // Transform to API data
            const filesAPI = files.map((file) => new DiskioFileAPI(file).toApi());
            // Return the files
            return filesAPI;
        } catch (error) {

            if (error instanceof NotFoundError) {
                throw new NotFoundResponse(error.message, context);
            }

            throw new InternalErrorResponse('Unknown error', context);
        }
    }

    public async download(request: HTTPRequest, context: IHTTPContextData) {
        let response: { file: IDiskioFileAPIData, stream: DiskIOFileSmartReadable } | undefined;

        try {
            const { params: path, headers } = request;

            let range: { from: number, to?: number } | undefined;

            if (headers.range) {
                const parts = headers.range.replace(/bytes=/, "").split("-");
                const from = parseInt(parts[0], 10);
                const to = parts[1] ? parseInt(parts[1], 10) : undefined;

                range = { from, to };
            }

            response = await this.diskIOService.download(path[0], range);
            // Set content name
            context.headers.push({
                key: 'Content-Disposition',
                value: `attachment; filename="${response.file.name}"`
            });
            // Set content length
            context.headers.push({
                key: 'Content-Length',
                value: response.file.size.toString()
            });

            return new StreamResponse(response.stream, context);
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
