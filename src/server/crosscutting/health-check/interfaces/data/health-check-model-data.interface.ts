import { IEntityModelData } from "../../../common/interfaces/data";

export interface IHealthCheckModelData extends IEntityModelData {
    server_name: string;
    server_memory_rss: number;
    server_memory_heap_total: number;
    server_memory_heap_used: number;
    server_memory_external: number;
    server_memory_array_buffers: number;
    server_version: `${number}.${number}.${number}`;
    uptime: number;
}