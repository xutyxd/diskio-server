#!/bin/bash
cat >package/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >package/mjs/package.json <<!EOF
{
    "type": "module"
}
!EOF

mkdir -p package/openapi && cp src/openapi/specification* package/openapi