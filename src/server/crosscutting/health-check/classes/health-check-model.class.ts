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
            uptime: this.uptime
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
            uptime: this.uptime
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
            uptime: entity.uptime
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
            uptime: entity.uptime
        });
    }
}