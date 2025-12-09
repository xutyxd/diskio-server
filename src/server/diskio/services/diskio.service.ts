import { Readable } from 'stream';
import { pipeline } from 'node:stream/promises';
import { FileInfo } from 'busboy';

import { DiskIOBatch, DiskIOFileSmart, DiskIOFileSmartWritable, DiskIOFileSmartReadable } from "diskio-core";

import { inject, injectable } from "inversify";
import { HTTPRequest, IHTTPContextData } from "server-over-express";
import { ConfigurationService } from "../../configuration/services/configuration.service";
import { NotFoundError } from "../../crosscutting/common/errors";
import { IDiskIOFileManifest } from 'diskio-core/cjs/interfaces/diskio-file-manifest.interface';
import { EntityService } from '../../crosscutting/common';
import { IDiskIOAPIData, IDiskIOData, IDiskIOModelData } from '../interfaces/data';
import { DiskIORepository } from '../repository/diskio.repository';
import { DiskIO } from '../classes';

@injectable()
export class DiskIOService extends EntityService<IDiskIOAPIData, IDiskIOData, IDiskIOModelData> {

    private diskio: DiskIOBatch;

    private hashMap: Map<string, IDiskIOFileManifest> = new Map();

    constructor(@inject(ConfigurationService) configurationService: ConfigurationService,
                @inject(DiskIORepository) diskIORepository: DiskIORepository) {
        super(diskIORepository, DiskIO);
        const { path, size, depth } = configurationService.diskio;
        this.diskio = new DiskIOBatch(path, size, depth as 1 | 2 | 3 | 4 | 5);
    }

    public async information() {
        const disk = await this.diskio.information.disk();
        const diskio = await this.diskio.information.diskio();

        return {
            disk,
            diskio
        };
    }

    public async upload(request: HTTPRequest, context: IHTTPContextData) {
        const { files } = context;

        const finish: Promise<void>[] = [];
        const processed = new Promise<void>((resolve, reject) => {
            request.on('error', reject);
            request.on('end', resolve);
        });

        finish.push(processed);

        const onFile = async (name: string, file: Readable, information: FileInfo) => {
            const start = new Date().getTime();
            const { filename } = information;
            const diskioFileSmart = new DiskIOFileSmart(this.diskio);
            await diskioFileSmart.ready;
            const uuid = crypto.randomUUID();
            // Create a write stream
            const writeStream = new DiskIOFileSmartWritable(diskioFileSmart);
            // Wait to be fully written
            await pipeline(file, writeStream);
            // Close the write stream
            await diskioFileSmart.close();
            // Get the manifest
            const manifest = diskioFileSmart.manifest;
            // Calculate chunk size
            const written = manifest.chunks.reduce((acc, chunk) => acc + chunk.size, 0);
            // Calculate original size
            const original = manifest.chunks.reduce((acc, chunk) => acc + chunk.original, 0);
            console.log({ written, original });
            console.log('Chunks: ', manifest.chunks.length);
            // Add the manifest to the hashmap
            this.hashMap.set(uuid, manifest);
            const end = new Date().getTime();
            console.log(`File ${name} processed in ${end - start}ms`);
        };
        files.on('file', (name, stream, info) => {
            const handling = onFile(name, stream, info);
            finish.push(handling);
        });
            // const diskioFile = this.diskio.createSync(filename);
            // const writtings: Promise<void>[] = [];
            // let index = 0;

            // diskioFiles.push(diskioFile);
            // await diskioFile.ready;

            // file.on('data', (chunk) => {
            //     // Write the chunk to the file
            //     const writting = diskioFile.write(chunk, index);
            //     // Increment the index
            //     index += chunk.length;
            //     // Push the writting promise to the array
            //     writtings.push(writting);
            // }).on('close', async () => {
            //     // Wait for all the writtings to finish
            //     await Promise.all(writtings);
            //     // Close the file
            //     await diskioFile.close();
            // });
        // });
        await processed;
        console.log('To finish: ', finish);
        // Wait to process the request
        await Promise.all(finish);
        // Map the files to their names
        return [ ...this.hashMap.keys() ];
    }

    public async download(name: string) {
        const manifest = this.hashMap.get(name);

        if (!manifest) {
            throw new NotFoundError('File not found');
        }
        try {
            // Create a smart file
            const diskioFileSmart = new DiskIOFileSmart(this.diskio, manifest);
            await diskioFileSmart.ready;
            // Create a readable stream
            const fileStream = new DiskIOFileSmartReadable(diskioFileSmart);
            fileStream.once('end', () => {
                diskioFileSmart.close();
            });
            // Return the stream
            return fileStream;
        } catch (error) {
            console.warn(error);
        }
        
        // // Check if file exists
        // try {
        //     const file = this.diskio.getSync(name, true);
        //     // If file exists, close it
        //     file.ready.then(() => file.close());
        // } catch (e) {
        //     throw new NotFoundError('File not found');
        // }
        // // Create a stream
        // const fileStream = new DiskIOFileReadable(this.diskio, name.split('/'));
        // // Wait for the file to be ready
        // await fileStream.ready;
        // // Return the stream
        // return fileStream;
    }

    public override async delete(name: string) {
        let file = {} as IDiskIOData;
        // Check if file exists
        try {
            // file = this.diskio.getSync(name, true);
            // // Wait for the file to be ready
            // await file.ready;
            // // Delete the file
            // await file.delete();
        } catch (e) {
            throw new NotFoundError('File not found');
        }

        return file;
    }
}
