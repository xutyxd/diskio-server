import { EntityAPI } from "../../crosscutting/common/classes";
import { IDiskIOAPIData, IDiskIOData } from "../interfaces/data";
import { IDiskIOAPI } from "../interfaces/dto";

export class DiskIOAPI extends EntityAPI implements IDiskIOAPI {
    
    public propertyA;

    constructor(data: IDiskIOAPIData) {
        super(data);

        this.propertyA = data.propertyA;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            propertyA: this.propertyA
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            propertyA: this.propertyA
        };
    }

    public static fromDomain(entity: IDiskIOData) {
        return new DiskIOAPI({ ...entity });
    }
}
