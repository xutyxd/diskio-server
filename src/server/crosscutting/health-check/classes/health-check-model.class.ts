import { EntityModel } from "../../common/classes";
import { IHealthCheckData, IHealthCheckModelData } from "../interfaces/data";
import { IHealthCheckModel } from "../interfaces/dto";

export class HealthCheckModel extends EntityModel implements IHealthCheckModel {

    public server_name;
    public server_memory_rss;
    public server_memory_heap_total;
    public server_memory_heap_used;
    public server_memory_external;
    public server_memory_array_buffers;
    public server_version;
    public uptime;
    public disk_available;
    public disk_capacity;
    public disk_filesystem;
    public disk_mount;
    public disk_size;
    public disk_used;
    public diskio_available;
    public diskio_capacity;
    public diskio_size;
    public diskio_used;

    constructor(data: IHealthCheckModelData) {
        super(data);

        this.server_name = data.server_name;
        this.server_memory_rss = data.server_memory_rss;
        this.server_memory_heap_total = data.server_memory_heap_total;
        this.server_memory_heap_used = data.server_memory_heap_used;
        this.server_memory_external = data.server_memory_external;
        this.server_memory_array_buffers = data.server_memory_array_buffers;
        this.server_version = data.server_version;
        this.uptime = data.uptime;
        this.disk_available = data.disk_available;
        this.disk_capacity = data.disk_capacity;
        this.disk_filesystem = data.disk_filesystem;
        this.disk_mount = data.disk_mount;
        this.disk_size = data.disk_size;
        this.disk_used = data.disk_used;
        this.diskio_available = data.diskio_available;
        this.diskio_capacity = data.diskio_capacity;
        this.diskio_size = data.diskio_size;
        this.diskio_used = data.diskio_used;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            server: {
                name: this.server_name,
                memory: {
                    rss: this.server_memory_rss,
                    heapTotal: this.server_memory_heap_total,
                    heapUsed: this.server_memory_heap_used,
                    external: this.server_memory_external,
                    arrayBuffers: this.server_memory_array_buffers
                },
                version: this.server_version,
            },
            uptime: this.uptime,
            disk: {
                filesystem: this.disk_filesystem,
                size: this.disk_size,
                used: this.disk_used,
                available: this.disk_available,
                capacity: this.disk_capacity,
                mount: this.disk_mount
            },
            diskio: {
                size: this.diskio_size,
                used: this.diskio_used,
                available: this.diskio_available,
                capacity: this.diskio_capacity
            }
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            server_name: this.server_name,
            server_memory_rss: this.server_memory_rss,
            server_memory_heap_total: this.server_memory_heap_total,
            server_memory_heap_used: this.server_memory_heap_used,
            server_memory_external: this.server_memory_external,
            server_memory_array_buffers: this.server_memory_array_buffers,
            server_version: this.server_version,
            uptime: this.uptime,
            disk_available: this.disk_available,
            disk_capacity: this.disk_capacity,
            disk_filesystem: this.disk_filesystem,
            disk_mount: this.disk_mount,
            disk_size: this.disk_size,
            disk_used: this.disk_used,
            diskio_available: this.diskio_available,
            diskio_capacity: this.diskio_capacity,
            diskio_size: this.diskio_size,
            diskio_used: this.diskio_used,
        };
    }

    public static fromDomain(entity: IHealthCheckData) {
        const base = super.fromDomain(entity);

        return new HealthCheckModel({
            ...base,
            server_name: entity.server.name,
            server_memory_rss: entity.server.memory.rss,
            server_memory_heap_total: entity.server.memory.heapTotal,
            server_memory_heap_used: entity.server.memory.heapUsed,
            server_memory_external: entity.server.memory.external,
            server_memory_array_buffers: entity.server.memory.arrayBuffers,
            server_version: entity.server.version,
            uptime: entity.uptime,
            disk_filesystem: entity.disk.filesystem,
            disk_size: entity.disk.size,
            disk_used: entity.disk.used,
            disk_available: entity.disk.available,
            disk_capacity: entity.disk.capacity,
            disk_mount: entity.disk.mount,
            diskio_size: entity.diskio.size,
            diskio_used: entity.diskio.used,
            diskio_available: entity.diskio.available,
            diskio_capacity: entity.diskio.capacity
        });
    }

    public static fromRepository(entity: IHealthCheckModelData) {
        const base = super.fromRepository(entity);

        return new HealthCheckModel({
            ...base,
            server_name: entity.server_name,
            server_memory_rss: entity.server_memory_rss,
            server_memory_heap_total: entity.server_memory_heap_total,
            server_memory_heap_used: entity.server_memory_heap_used,
            server_memory_external: entity.server_memory_external,
            server_memory_array_buffers: entity.server_memory_array_buffers,
            server_version: entity.server_version,
            uptime: entity.uptime,
            disk_available: entity.disk_available,
            disk_capacity: entity.disk_capacity,
            disk_filesystem: entity.disk_filesystem,
            disk_mount: entity.disk_mount,
            disk_size: entity.disk_size,
            disk_used: entity.disk_used,
            diskio_available: entity.diskio_available,
            diskio_capacity: entity.diskio_capacity,
            diskio_size: entity.diskio_size,
            diskio_used: entity.diskio_used
        });
    }
}