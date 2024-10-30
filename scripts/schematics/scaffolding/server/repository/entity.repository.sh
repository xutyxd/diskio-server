#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/repository/$entity_name.repository.ts"
import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { ToReplaceModel } from "../classes";
import { IToReplaceData, IToReplaceModelData } from "../interfaces/data";

@injectable()
export class ToReplaceRepository extends EntityRepositoryService<IToReplaceData, IToReplaceModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IToReplaceModelData>) {
        const table = 'to-replace';
        super(dataBaseService, table, ToReplaceModel);
    }
}
EOF