import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common/services";
import { DiskioChunk } from "../classes/diskio-chunk.class";
import { IDiskioChunkAPIData, IDiskioChunkData, IDiskioChunkModelData } from "../interfaces/data";
import { DiskioChunkRepository } from "../repository/diskio-chunk.repository";

@injectable()
export class DiskioChunkService extends EntityService<IDiskioChunkAPIData, IDiskioChunkData, IDiskioChunkModelData> {

    constructor(@inject(DiskioChunkRepository) readonly diskioChunkRepository: DiskioChunkRepository) {
        super(diskioChunkRepository, DiskioChunk);
    }

    public async upsert(chunks: IDiskioChunkData[]) {
        // Instance every chunk
        const instances = chunks.map((chunk) => new DiskioChunk(chunk));
        // Transform to model
        const models = instances.map((chunk) => chunk.toModel());
        // Upsert chunks
        const upserted = await this.diskioChunkRepository.upsert(models);
        // Return the upserted chunks
        return upserted.map((chunk) => DiskioChunk.fromModel(chunk).toDomain());
    }
}
