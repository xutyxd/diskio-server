#!/bin/bash
entity_name="$1"
entity_folder="src/server/$entity_name"
class_name=$(echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g')
instance_name=$(echo "$class_name" | sed -E 's/^[A-Z]/\L&/')

sed -e "s/ToReplace/$class_name/g" \
    -e "s/to-replace/$entity_name/g" \
    -e  "s/toReplace/$instance_name/g" << EOF > "$entity_folder/index.ts"
import { Container } from "inversify";

import { ToReplaceController } from "./controllers/to-replace.controller";
import { ToReplaceRepository } from "./repository/to-replace.repository";
import { ToReplaceService } from "./services/to-replace.service";

const ToReplaceContainer = new Container();

ToReplaceContainer.bind<ToReplaceController>(ToReplaceController).toSelf();
ToReplaceContainer.bind<ToReplaceService>(ToReplaceService).toSelf();
ToReplaceContainer.bind<ToReplaceRepository>(ToReplaceRepository).toSelf();

export { ToReplaceContainer, ToReplaceController };
EOF