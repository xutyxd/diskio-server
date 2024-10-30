import { EntityModel } from "../../crosscutting/common/classes";
import { IDiskioData, IDiskioModelData } from "../interfaces/data";
import { IDiskioModel } from "../interfaces/dto";

export class DiskioModel extends EntityModel implements IDiskioModel {

    public property_a;

    constructor(data: IDiskioModelData) {
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

    public static fromDomain(entity: IDiskioData) {
        const base = super.fromDomain(entity);

        return new DiskioModel({
            ...base,
            property_a: entity.propertyA
        });
    }

    public static fromRepository(entity: IDiskioModelData) {
        const base = super.fromRepository(entity);

        return new DiskioModel({
            ...base,
            property_a: entity.property_a
        });
    }
}
