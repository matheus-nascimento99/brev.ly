FROM node:23 AS dependencies

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

FROM dependencies AS build

WORKDIR /usr/src/app

COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run db:generate
RUN npm run build
RUN npm install --production

FROM node:23-slim AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /usr/src/app/src/infra/env.ts ./src/infra/env.ts
COPY --from=build /usr/src/app/src/infra/env-schema.ts ./src/infra/env-schema.ts
COPY --from=build /usr/src/app/src/infra/database/drizzle/migrations ./src/infra/database/drizzle/migrations

EXPOSE 3333

CMD ["sh", "-c", "npm run db:migrate && node dist/infra/http/server.js"]