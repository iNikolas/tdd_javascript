FROM node:26-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

COPY packages/client/package.json ./packages/client/
COPY packages/shared/package.json ./packages/shared/

RUN npm install


FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/client/node_modules ./packages/client/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/packages/shared/package.json ./packages/shared/
COPY packages/client ./packages/client
COPY packages/shared ./packages/shared

COPY packages/client/.env ./packages/client/.env

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_INTERNAL_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_INTERNAL_API_URL=$NEXT_PUBLIC_INTERNAL_API_URL

RUN npm run build:shared
RUN npm run build:client

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/packages/client/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/packages/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/client/.next/static ./packages/client/.next/static


USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node packages/client/server.js