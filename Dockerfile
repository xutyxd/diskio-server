FROM alpine AS builder
# Download and install Node.js
RUN apk add --no-cache nodejs npm

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run openapi:bundle
RUN npm run server:build
RUN npm run clean

--------

FROM xutyxd/node-quark:22 AS runner

USER root

RUN mkdir -p /usr/src/app && \
    chown -R 1000:1000 /usr/src/app

WORKDIR /usr/src/app

USER 1000

COPY --from=builder /usr/src/app/server/cjs /usr/src/app/server/cjs
COPY --from=builder /usr/src/app/server/openapi /usr/src/app/server/openapi
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

CMD ["./server/cjs/index.js"]

# Expose port
EXPOSE 8080