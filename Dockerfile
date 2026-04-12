FROM alpine:3.22 AS builder
# Download and install Node.js
RUN apk add --no-cache nodejs npm coreutils

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run openapi:bundle
RUN npm run server:build
RUN npm run clean

# --------

FROM alpine:3.22 AS tools

RUN apk add --no-cache coreutils

RUN mkdir -p /usr/src/app && \
    chown -R 1000:1000 /usr/src/app

# --------

FROM xutyxd/node-quark:22 AS runner

# Copy the coreutils binaries
COPY --from=tools /usr/bin/ /usr/bin/
# Copy the required shared libraries from Alpine
COPY --from=tools /usr/lib/ /usr/lib/
COPY --from=tools /lib/ /lib/

COPY --from=tools /usr/src/app /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/server/cjs /usr/src/app/server/cjs
COPY --from=builder /usr/src/app/server/openapi /usr/src/app/server/openapi
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

CMD ["./server/cjs/index.js"]

# Expose port
EXPOSE 8080