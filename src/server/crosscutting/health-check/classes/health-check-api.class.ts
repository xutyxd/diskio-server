import { EntityAPI } from "../../common/classes";
import { IHealthCheckAPIData, IHealthCheckData } from "../interfaces/data";
import { IHealthCheckAPI } from "../interfaces/dto";

export class HealthCheckAPI extends EntityAPI implements IHealthCheckAPI {
    
    public server;
    public uptime;
    public time;

    constructor(data: IHealthCheckAPIData) {
        super(data);

        this.server = data.server;
        this.uptime = data.uptime;
        this.time = data.time;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            server: this.server,
            uptime: this.uptime,
            time: this.time
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            server: this.server,
            uptime: this.uptime,
            time: this.time
        };
    }

    public static fromDomain(entity: IHealthCheckData) {
        return new HealthCheckAPI({ ...entity, time: 0})
    }
}