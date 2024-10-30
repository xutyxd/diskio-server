#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e "s/toReplace/$instance_name/g" << EOF > "$entity_folder/interfaces/dto/$entity_name.interface.ts"
import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IToReplaceAPIData, IToReplaceData, IToReplaceModelData } from "../data";

export interface IToReplace extends IEntity<IToReplaceAPIData, IToReplaceData, IToReplaceModelData> { }
EOF

