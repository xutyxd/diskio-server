import { EntityModel } from "../../crosscutting/common/classes";
import { IDiskIOData, IDiskIOModelData } from "../interfaces/data";
import { IDiskIOModel } from "../interfaces/dto";

export class DiskIOModel extends EntityModel implements IDiskIOModel {

    public property_a;

    constructor(data: IDiskIOModelData) {
        super(data);

        this.property_a = data.property_a;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            propertyA: this.property_a
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            property_a: this.property_a
        };
    }

    public static fromDomain(entity: IDiskIOData) {
        const base = super.fromDomain(entity);

        return new DiskIOModel({
            ...base,
            property_a: entity.propertyA
        });
    }

    public static fromRepository(entity: IDiskIOModelData) {
        const base = super.fromRepository(entity);

        return new DiskIOModel({
            ...base,
            property_a: entity.property_a
        });
    }
}
