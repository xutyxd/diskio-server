#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/services/$entity_name.service.ts"
import { inject, injectable } from "inversify";
import { EntityService } from "../../crosscutting/common/services";
import { ToReplace } from "../classes/to-replace.class";
import { IToReplaceAPIData, IToReplaceData, IToReplaceModelData } from "../interfaces/data";
import { ToReplaceRepository } from "../repository/to-replace.repository";

@injectable()
export class ToReplaceService extends EntityService<IToReplaceAPIData, IToReplaceData, IToReplaceModelData> {

    constructor(@inject(ToReplaceRepository) readonly toReplace: ToReplaceRepository) {
        super(toReplace, ToReplace);
    }
}
EOF