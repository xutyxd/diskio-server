import { DiskIO } from "diskio-core";
import { IEntityData } from "../../../common/interfaces/data";

export interface IHealthCheckData extends IEntityData {
    server: {
        name: string;
        memory: {
            rss: number;
            heapTotal: number;
            heapUsed: number;
            external: number;
            arrayBuffers: number;
        };
        version: `${number}.${number}.${number}`;
    };
    uptime: number;
    disk: Awaited<ReturnType<DiskIO['information']['disk']>>;
    diskio: Awaited<ReturnType<DiskIO['information']['diskio']>>;
}