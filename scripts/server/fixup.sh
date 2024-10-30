#!/bin/bash
cat >server/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

# cat >server/mjs/package.json <<!EOF
# {
#     "type": "module"
# }
# !EOF

mkdir -p server/openapi && cp src/openapi/specification* server/openapi