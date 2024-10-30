import { EntityAPI } from "../../crosscutting/common/classes";
import { IDiskioAPIData, IDiskioData } from "../interfaces/data";
import { IDiskioAPI } from "../interfaces/dto";

export class DiskioAPI extends EntityAPI implements IDiskioAPI {
    
    public propertyA;

    constructor(data: IDiskioAPIData) {
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

    public static fromDomain(entity: IDiskioData) {
        return new DiskioAPI({ ...entity });
    }
}
