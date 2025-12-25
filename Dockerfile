FROM alpine AS builder
# Download and install Node.js
RUN apk add --no-cache nodejs npm

WORKDIR /user/src/app

ADD . .
RUN npm install
RUN npm run openapi:bundle
RUN npm run server:build
RUN npm run clean

FROM alpine AS runner
# Download and install Node.js
RUN apk add --no-cache nodejs npm coreutils

WORKDIR /user/src/app

COPY --from=builder /user/src/app/server/cjs /user/src/app/server/cjs
COPY --from=builder /user/src/app/server/openapi /user/src/app/server/openapi
COPY --from=builder /user/src/app/package.json /user/src/app/package.json
COPY --from=builder /user/src/app/node_modules /user/src/app/node_modules
CMD [ "npm", "start" ]
# Expose port
EXPOSE 8080