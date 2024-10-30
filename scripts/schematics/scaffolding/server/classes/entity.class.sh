#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/classes/$entity_name.class.ts"
import { Entity } from "../../crosscutting/common/classes";
import { IToReplaceAPIData, IToReplaceData, IToReplaceModelData } from "../interfaces/data";
import { IToReplace } from "../interfaces/dto";

export class ToReplace extends Entity implements IToReplace {

    public propertyA;

    constructor(data: Partial<IToReplaceData>) {
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

    public static fromAPI(entity: IToReplaceAPIData) {
        return new ToReplace(entity);
    }

    public static fromModel(entity: IToReplaceModelData) {
        const base = super.fromModel(entity);

        return new ToReplace({
            ...base,
            propertyA: entity.property_a
        });
    }
}
EOF