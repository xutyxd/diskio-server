#!/bin/bash

# Check if the entity name is provided
if [ -z "$1" ]; then
    echo "Please provide an entity name"
    exit 1
fi

# Check if the entity name is valid
if [[ ! $1 =~ ^[a-zA-Z0-9]+$ ]]; then
    echo "Invalid entity name"
    exit 1
fi

# Check if the entity name is already in use
if [ -d "src/server/$1" ]; then
    echo "Entity already exists"
    exit 1
fi

# Create the new folder scaffolding for openapi
# function create_entity_openapi() {
#     local entity_name=$1
#     local entity_folder="src/openapi/$entity_name"

#     # Create the new folder scaffolding the entity
#     mkdir $entity_folder
#     mkdir $entity_folder/examples
#     mkdir $entity_folder/models
#     mkdir $entity_folder/paths
#     mkdir $entity_folder/request
# }

# Create a new entity
function create_entity_server() {
    local entity_name=$1
    local entity_folder="src/server/$entity_name"
    # local entity_test_folder="tests/units/$entity_name"

    # Create the new folder scaffolding the entity
    mkdir $entity_folder
    mkdir $entity_folder/classes
    mkdir $entity_folder/controllers
    mkdir $entity_folder/interfaces
    mkdir $entity_folder/interfaces/data
    mkdir $entity_folder/interfaces/dto
    mkdir $entity_folder/repository
    mkdir $entity_folder/schemas
    mkdir $entity_folder/services
    # mkdir $entity_test_folder

    # Create the entity class
    touch $entity_folder/classes/$entity_name.class.ts
    touch $entity_folder/classes/$entity_name-api.class.ts
    touch $entity_folder/classes/$entity_name-model.class.ts
    touch $entity_folder/classes/index.ts

    # Create the entity controller
    touch $entity_folder/controllers/$entity_name.controller.ts

    # Create the entity interface
    touch $entity_folder/interfaces/data/$entity_name-api-data.interface.ts
    touch $entity_folder/interfaces/data/$entity_name-data.interface.ts
    touch $entity_folder/interfaces/data/$entity_name-model-data.interface.ts
    touch $entity_folder/interfaces/data/index.ts
    touch $entity_folder/interfaces/dto/$entity_name-api.interface.ts
    touch $entity_folder/interfaces/dto/$entity_name-model.interface.ts
    touch $entity_folder/interfaces/dto/$entity_name.interface.ts
    touch $entity_folder/interfaces/dto/index.ts

    # Create the entity repository
    touch $entity_folder/repository/$entity_name.repository.ts

    # Create the entity schema
    touch $entity_folder/schemas/index.ts

    # Create the entity service
    touch $entity_folder/services/$entity_name.service.ts

    # Create the entity index
    touch $entity_folder/index.ts

    # Create the entity test
    # touch $entity_test_folder/entity.spec.ts
}

# Create a new entity
create_entity_server $1
# create_entity_openapi $1

echo "Scaffolding completed."

# Start executing creation of the entity files

# Create the entity class
./scripts/schematics/scaffolding/server/classes/entity.class.sh $1
./scripts/schematics/scaffolding/server/classes/entity-model.class.sh $1
./scripts/schematics/scaffolding/server/classes/entity-api.class.sh $1
./scripts/schematics/scaffolding/server/classes/index.sh $1

# Create the entity controller
./scripts/schematics/scaffolding/server/controllers/entity.controller.sh $1

# Create the entity interface
# Create data interfaces
./scripts/schematics/scaffolding/server/interfaces/data/entity-api-data.interface.sh $1
./scripts/schematics/scaffolding/server/interfaces/data/entity-data.interface.sh $1
./scripts/schematics/scaffolding/server/interfaces/data/entity-model-data.interface.sh $1
./scripts/schematics/scaffolding/server/interfaces/data/index.sh $1
# Create dto interfaces
./scripts/schematics/scaffolding/server/interfaces/dto/entity-api.interface.sh $1
./scripts/schematics/scaffolding/server/interfaces/dto/entity-model.interface.sh $1
./scripts/schematics/scaffolding/server/interfaces/dto/entity.interface.sh $1
./scripts/schematics/scaffolding/server/interfaces/dto/index.sh $1

# Create the entity repository
./scripts/schematics/scaffolding/server/repository/entity.repository.sh $1

# Create the entity schema
./scripts/schematics/scaffolding/server/schemas/index.sh $1

# Create the entity service
./scripts/schematics/scaffolding/server/services/entity.service.sh $1

# Create the entity index
./scripts/schematics/scaffolding/server/index.sh $1
