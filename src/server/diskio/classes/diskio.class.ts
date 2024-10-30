import { Entity } from "../../crosscutting/common/classes";
import { IDiskioAPIData, IDiskioData, IDiskioModelData } from "../interfaces/data";
import { IDiskio } from "../interfaces/dto";

export class Diskio extends Entity implements IDiskio {

    public propertyA;

    constructor(data: Partial<IDiskioData>) {
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

    public static fromAPI(entity: IDiskioAPIData) {
        return new Diskio(entity);
    }

    public static fromModel(entity: IDiskioModelData) {
        const base = super.fromModel(entity);

        return new Diskio({
            ...base,
            propertyA: entity.property_a
        });
    }
}
