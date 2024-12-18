import { DiskIO } from "diskio-core";
import { IEntityAPIData } from "../../../common/interfaces/data";

export interface IHealthCheckAPIData extends IEntityAPIData {
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
    time: number;
    disk: Awaited<ReturnType<DiskIO['information']['disk']>>;
    diskio: Awaited<ReturnType<DiskIO['information']['diskio']>>;
}