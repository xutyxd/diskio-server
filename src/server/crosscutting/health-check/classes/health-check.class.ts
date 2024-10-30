import { Entity } from "../../common/classes";
import { IHealthCheckAPIData, IHealthCheckData, IHealthCheckModelData } from "../interfaces/data";
import { IHealthCheck } from "../interfaces/dto";

export class HealthCheck extends Entity implements IHealthCheck {

    public server;
    public uptime;

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
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            server: this.server,
            uptime: this.uptime,
            time: 0
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            server: this.server,
            uptime: this.uptime
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
            uptime: this.uptime
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
            uptime: entity.uptime
        });
    }
}