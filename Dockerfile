# Build BASE
FROM node:22-alpine as BASE
LABEL author="Suraj <suraj@surajrimal.dev>"

WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn install --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:22-alpine AS BUILD
LABEL author="Suraj <suraj@surajrimal.dev>"

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache git curl \
    && yarn add sharp \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline \
    && npm install -g node-prune \
    && node-prune

# Build production
FROM node:22-alpine AS PRODUCTION
LABEL author="Suraj <suraj@surajrimal.dev>"

WORKDIR /app

COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.js ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static
COPY --from=BUILD /app/.next/server ./.next/server

EXPOSE 3000

CMD ["node", "server.js"]