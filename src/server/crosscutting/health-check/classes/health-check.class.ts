import { Entity } from "../../common/classes";
import { IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData } from "../interfaces/data";
import { IHealthCheck } from "../interfaces/dto";

export class HealthCheck extends Entity implements IHealthCheck {

    public server;
    public uptime;
    public disk;
    public diskio;

    constructor(data: Partial<IHealthCheckData>) {
        super(data);

        const memory = {
            rss: 0,
            heapTotal: 0,
            heapUsed: 0,
            external: 0,
            arrayBuffers: 0
        };

        this.server = data.server || { name: 'unknown', memory, version: '0.0.0' };
        this.uptime = data.uptime || 0;
        this.disk = data.disk || { filesystem: 'unknown', size: 0, used: 0, available: 0, capacity: '0%', mount: 'unknown' };
        this.diskio = data.diskio || { size: 0, used: 0, available: 0, capacity: '0%' };
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            server: this.server,
            uptime: this.uptime,
            time: 0,
            disk: this.disk,
            diskio: this.diskio
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            server: this.server,
            uptime: this.uptime,
            disk: this.disk,
            diskio: this.diskio
        };
    }

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            server_name: this.server.name,
            server_memory_rss: this.server.memory.rss,
            server_memory_heap_total: this.server.memory.heapTotal,
            server_memory_heap_used: this.server.memory.heapUsed,
            server_memory_external: this.server.memory.external,
            server_memory_array_buffers: this.server.memory.arrayBuffers,
            server_version: this.server.version,
            uptime: this.uptime,
            disk_available: this.disk.available,
            disk_capacity: this.disk.capacity,
            disk_filesystem: this.disk.filesystem,
            disk_mount: this.disk.mount,
            disk_size: this.disk.size,
            disk_used: this.disk.used,
            diskio_available: this.diskio.available,
            diskio_capacity: this.diskio.capacity,
            diskio_size: this.diskio.size,
            diskio_used: this.diskio.used,
        };
    }

    public static fromAPI(entity: IHealthCheckAPIData) {
        return new HealthCheck(entity);
    }

    public static fromModel(entity: IHealthCheckModelData) {
        const base = super.fromModel(entity);

        return new HealthCheck({
            ...base,
            server: {
                name: entity.server_name,
                memory: {
                    rss: entity.server_memory_rss,
                    heapTotal: entity.server_memory_heap_total,
                    heapUsed: entity.server_memory_heap_used,
                    external: entity.server_memory_external,
                    arrayBuffers: entity.server_memory_array_buffers
                },
                version: entity.server_version
            },
            uptime: entity.uptime,
            disk: {
                filesystem: entity.disk_filesystem,
                size: entity.disk_size,
                used: entity.disk_used,
                available: entity.disk_available,
                capacity: entity.disk_capacity,
                mount: entity.disk_mount
            },
            diskio: {
                size: entity.diskio_size,
                used: entity.diskio_used,
                available: entity.diskio_available,
                capacity: entity.diskio_capacity
            }
        });
    }
}