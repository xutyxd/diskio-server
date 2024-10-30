#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/controllers/$entity_name.controller.ts"
import { inject, injectable } from 'inversify';
import { IHTTPController } from 'server-over-express';
import { EntityController } from '../../crosscutting/common';
import { IToReplaceAPIData, IToReplaceData, IToReplaceModelData } from '../interfaces/data';
import { ToReplaceService } from '../services/to-replace.service';
import { ToReplaceAPI } from '../classes';

@injectable()
export class ToReplaceController extends EntityController<IToReplaceAPIData, IToReplaceData, IToReplaceModelData> implements IHTTPController {

    public path = 'to-replace';

    constructor(@inject(ToReplaceService) readonly toReplaceService: ToReplaceService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/to-replace-base.request'
        };

        super(toReplaceService, schemas, ToReplaceAPI);
    }
}
EOF