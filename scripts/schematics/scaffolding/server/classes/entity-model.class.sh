#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/classes/$entity_name-model.class.ts"
import { EntityModel } from "../../crosscutting/common/classes";
import { IToReplaceData, IToReplaceModelData } from "../interfaces/data";
import { IToReplaceModel } from "../interfaces/dto";

export class ToReplaceModel extends EntityModel implements IToReplaceModel {

    public property_a;

    constructor(data: IToReplaceModelData) {
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

    public static fromDomain(entity: IToReplaceData) {
        const base = super.fromDomain(entity);

        return new ToReplaceModel({
            ...base,
            property_a: entity.propertyA
        });
    }

    public static fromRepository(entity: IToReplaceModelData) {
        const base = super.fromRepository(entity);

        return new ToReplaceModel({
            ...base,
            property_a: entity.property_a
        });
    }
}
EOF