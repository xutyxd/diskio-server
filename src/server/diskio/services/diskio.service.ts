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
import { DiskioChunkService } from '../../diskio-chunk/services/diskio-chunk.service';
import { DiskioFileService } from '../../diskio-file/services/diskio-file.service';
import { DiskioChunk } from '../../diskio-chunk/classes';
import { DiskioFile } from '../../diskio-file/classes';
import { IDiskioFileAPIData } from '../../diskio-file/interfaces/data';

@injectable()
export class DiskIOService {

    private diskio: DiskIOBatch;

    private hashMap: Map<string, IDiskIOFileManifest> = new Map();

    constructor(@inject(ConfigurationService) configurationService: ConfigurationService,
                @inject(DiskioChunkService) readonly diskioChunkService: DiskioChunkService,
                @inject(DiskioFileService) readonly diskioFileService: DiskioFileService) {
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
        const uploaded: IDiskioFileAPIData[] = [];

        const onFile = async (file: Readable, information: FileInfo) => {
            const { filename } = information;
            const diskioFileSmart = new DiskIOFileSmart(this.diskio);
            await diskioFileSmart.ready;
            // Create a write stream
            const writeStream = new DiskIOFileSmartWritable(diskioFileSmart, { highWaterMark: 16 * 1024 * 1024 });
            // Wait to be fully written
            await pipeline(file, writeStream);
            // Close the write stream
            await diskioFileSmart.close();
            // Get the manifest
            const { chunks } = diskioFileSmart.manifest;
            // Instance every chunk
            const instances = chunks.map((chunk) => new DiskioChunk(chunk));
            // Transform to dto
            const dtos = instances.map((chunk) => chunk.toDomain());
            // Upsert chunks
            const upserted = await this.diskioChunkService.upsert(dtos);
            // Create a map with hash to id
            const hashToIndex = new Map(chunks.map((c) => [c.hash, c.index]));
            // Create relation with uuid, hash, and index for each chunk
            const updated = upserted.map((c) => ({ ...c, index: hashToIndex.get(c.hash) || 0 }));
            // Save file with upserted chunks and map
            const diskioFile = new DiskioFile({ name: filename, chunks: updated });
            // Save file with upserted chunks
            const inserted = await this.diskioFileService.create(diskioFile.toDomain());
            // Return the file
            const toApi = new DiskioFile(inserted).toApi();
            // Push to the list
            uploaded.push(toApi);
        };
        files.on('file', (name, stream, info) => {
            const handling = onFile(stream, info);
            finish.push(handling);
        });
        await processed;
        // Wait to process the request
        await Promise.all(finish);
        // Map the files to their names
        return uploaded;
    }

    public async download(uuid: string) {
        // Get the file
        const file = await this.diskioFileService.get(uuid);
        // Get chunks
        const { chunks } = file;
        // Create a smart file
        const diskioFileSmart = new DiskIOFileSmart(this.diskio, { chunks });
        await diskioFileSmart.ready;
        // Create a readable stream
        const fileStream = new DiskIOFileSmartReadable(diskioFileSmart, { highWaterMark: 16 * 1024 * 1024 });
        fileStream.once('end', () => {
            diskioFileSmart.close();
        });
        // Return the stream
        return fileStream;
    }

    public async delete(uuid: string) {
        let file;
        // Check if file exists
        try {
            // Delete the file
            const deleted = await this.diskioFileService.delete(uuid);
            // Transform to dto
            file = new DiskioFile(deleted).toApi();
        } catch (e) {
            throw new NotFoundError('File not found');
        }

        return file;
    }
}
