FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY packages/server/package.json ./packages/server/
COPY packages/shared/package.json ./packages/shared/

RUN npm install

COPY packages/server ./packages/server
COPY packages/shared ./packages/shared

RUN npm run build:shared
RUN npm run build:server


FROM node:26-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY packages/server/package.json ./packages/server/
COPY packages/shared/package.json ./packages/shared/

RUN npm ci --omit=dev

COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

COPY --from=builder /app/packages/shared/drizzle ./packages/shared/drizzle
COPY --from=builder /app/packages/shared/drizzle.config.ts ./packages/shared/
COPY --from=builder /app/packages/shared/db/schema.ts ./packages/shared/db/

CMD ["npm", "run", "start:prod:server"]
