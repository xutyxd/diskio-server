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
    disk_available: number;
    disk_capacity: string;
    disk_filesystem: string;
    disk_mount: string;
    disk_size: number;
    disk_used: number;
    diskio_available: number;
    diskio_capacity: string;
    diskio_size: number;
    diskio_used: number;
}