<p align="center">
  <a href="https://github.com/xutyxd/ts-openapi-contract-first-boilerplate">
    <picture>
      <source srcset="./ts-contract-first-logo.png" width="150">
      <img alt="TS Contract First logo" src="./ts-contract-first-logo.png" width="150">
    </picture>
  </a>
</p>

# Contract-First Boilerplate for TypeScript – Streamline Your API Development

A boilerplate for building contract-first APIs in TypeScript with OpenAPI. Includes OpenAPI definition, compliant server setup, and npm package generation for seamless API development.


## Quick Start Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xutyxd/ts-openapi-contract-first-boilerplate
   cd ts-openapi-contract-first-boilerplate

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate OpenAPI definition:**
   ```bash
   npm run openapi:bundle
   npm run openapi:types
   npm run openapi:docs
   ```

4. **Run the tests:**
   ```bash
   npm run test:ts
   npm run test:units
   npm run test:functionals
   ```

5. **Run the server:**
   ```bash
   npm run start:local
   ```

## Project Structure

| Folder | Description |
| ------ | ----------- |
| **configurations** | Contains configuration files for the server and package |
| **cucumber.js** | Cucumber configuration file |
| **package** | Contains the package build configuration and scripts |
| **public** | Contains the static files for the server |
| **scripts** | Contains the scripts for the server and package |
| **src** | Contains the source code for the server and package |
| **src/openapi** | Contains the OpenAPI definition and specification |
| **src/openapi/common** | Contains the common models and responses |
| **src/openapi/crosscutting** | Contains the crosscutting models and responses |
| **src/openapi/crosscutting/health-check** | Contains the health-check entity **example** |
| **src/openapi/definition.json** | Contains the OpenAPI definition |
| **src/package** | Contains the package source code |
| **src/server** | Contains the server source code |
| **src/server/app.ts** | Contains the server entry point |
| **src/server/configuration** | Contains the server configuration |
| **src/server/crosscutting** | Contains the crosscutting source code |
| **src/server/crosscutting/common** | Contains the common source code |
| **tests** | Contains the test files |
| **tests/functionals** | Contains the functional tests |
| **tests/units** | Contains the unit tests |

### How to extend the project

1. Define openapi request/responses for new entity
   - Create the new folder scaffolding the entity
       ```bash
       mkdir src/openapi/new-entity
       mkdir src/openapi/new-entity/examples
       mkdir src/openapi/new-entity/models
       mkdir src/openapi/new-entity/paths
       mkdir src/openapi/new-entity/request
       ```
    - Add ref to paths in `definition.json`
    - Optionally, add ref to components in definition.json

2. Add tests for new entity
    - Create the new folder scaffolding the entity
        ```bash
        mkdir tests/functionals/new-entity
        mkdir tests/functionals/new-entity/new-entity.feature
        mkdir tests/functionals/new-entity/new-entity.feature.steps.ts
        ```

        mkdir tests/units/new-entity

3. Finally, add the new entity to the server
    - Run next command to scaffold the entity
        ```bash
        npm run entity:scaffold new-entity
        ```
    - `src/server/app.ts` Add the new entity to the container

## Dependencies
Check dependencies for more documentation
- [Node.js](https://nodejs.org/en/) (v21.6.2)
- [npm](https://www.npmjs.com/) (v9.6.1)
- [SoE](https://github.com/xutyxd/server-over-express) (v1.6.1)
- [InversifyJS](https://github.com/inversify/InversifyJS) (v6.0.2)
- [OpenAPI Fetch](https://github.com/xutyxd/openapi-fetch) (v0.12.0)
- [Ajv](https://github.com/ajv-validator/ajv) (v8.17.1)

## License

This project is licensed under the AGPL-3.0 license - see the [LICENSE](LICENSE) file for details

<p align="left">
  Made with ☕ by
  <a href="https://github.com/xutyxd">
    XutyXD
  </a>
</p>