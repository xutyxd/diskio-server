import { Entity } from "../../crosscutting/common/classes";
import { IDiskIOAPIData, IDiskIOData, IDiskIOModelData } from "../interfaces/data";
import { IDiskIO } from "../interfaces/dto";

export class DiskIO extends Entity implements IDiskIO {

    public propertyA;

    constructor(data: Partial<IDiskIOData>) {
        super(data);

        this.propertyA = data.propertyA || 'default value';
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

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            property_a: this.propertyA
        };
    }

    public static fromAPI(entity: IDiskIOAPIData) {
        return new DiskIO(entity);
    }

    public static fromModel(entity: IDiskIOModelData) {
        const base = super.fromModel(entity);

        return new DiskIO({
            ...base,
            propertyA: entity.property_a
        });
    }
}
