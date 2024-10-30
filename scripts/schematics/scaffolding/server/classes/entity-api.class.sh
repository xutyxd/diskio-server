#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-reaplace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/classes/$entity_name-api.class.ts"
import { EntityAPI } from "../../crosscutting/common/classes";
import { IToReplaceAPIData, IToReplaceData } from "../interfaces/data";
import { IToReplaceAPI } from "../interfaces/dto";

export class ToReplaceAPI extends EntityAPI implements IToReplaceAPI {
    
    public propertyA;

    constructor(data: IToReplaceAPIData) {
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

    public static fromDomain(entity: IToReplaceData) {
        return new ToReplaceAPI({ ...entity });
    }
}
EOF