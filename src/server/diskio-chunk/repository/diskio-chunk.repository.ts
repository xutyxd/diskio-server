import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { DiskioChunk, DiskioChunkModel } from "../classes";
import { IDiskioChunkData, IDiskioChunkModelData } from "../interfaces/data";
import { MongoDatabaseService } from "../../crosscutting/database/services/mongo-database.service";
import { AnyBulkWriteOperation } from "mongodb";

@injectable()
export class DiskioChunkRepository extends EntityRepositoryService<IDiskioChunkData, IDiskioChunkModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: MongoDatabaseService<IDiskioChunkModelData>) {

        const isMongo = dataBaseService instanceof MongoDatabaseService;
        if (!isMongo) {
            throw new Error('Database service must be an instance of MongoDatabaseService');
        }

        const table = 'diskio-chunk';
        super(dataBaseService, table, DiskioChunkModel);
    }

    public async upsert(chunks: IDiskioChunkModelData[]): Promise<IDiskioChunkModelData[]> {
        // Get instances
        const models = chunks.map((chunk) => new DiskioChunkModel(chunk));
        // Define the bulk operations
        const operations: AnyBulkWriteOperation<IDiskioChunkModelData>[] = models.map((chunk) => {
            const { refs, ...rest } = chunk.toRepository();
            return {
                updateOne: {
                    filter: { hash: chunk.hash }, // Uniquely identify by hash
                    update: {
                        $inc: { refs: 1 },     // Atomic Increment
                        $setOnInsert: {             // Only set these if creating new doc
                            ...rest,
                        },
                    },
                    upsert: true, // The magic flag: Create if not exists
                },
            }
        });
        // Get the collection
        const collection = this.dataBaseService.table.get<IDiskioChunkModelData>(this.table);
        // Execute the bulk operations
        // orderd: false means that the operations will be executed in parallel -> faster
        await collection.bulkWrite(operations, { ordered: false });
        // Get hashes to retrieve ids from chunks upserted
        const hashes = chunks.map((c) => c.hash);
        // Get the ids of the upserted chunks
        const storedChunks = await collection
            .find({ hash: { $in: hashes } })
            .project({ _id: 1, hash: 1 })
            .toArray() as { _id: string, hash: string }[];
        // Map back to original order if strict ordering is required for the file map
        const hashToIdMap = new Map(storedChunks.map((c) => [c.hash, c._id.toString()]));
        return chunks.map((c) => ({ ...c, uuid: hashToIdMap.get(c.hash) || '' }));
    }
}
