#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/schemas/index.ts"
import { components } from "../../../openapi/specification.json";

export const toReplaceBase = components['schemas']['to-replace-base.request'];
export const toReplaceCreate = components['schemas']['to-replace-create.request'];
export const toReplaceUpdate = components['schemas']['to-replace-update.request'];
EOF