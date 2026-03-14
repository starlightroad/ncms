FROM node:22-alpine3.18 AS base

# Step 1 - Rebuild the source code only when needed
FROM base AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate

# Build Next.js
RUN npm run build

# Step 2 - Production image
FROM base AS runner

WORKDIR /app

RUN apk add --no-cache openssl

# Install Prisma and Bcrypt using the versions listed in the package-lock.json file
COPY package-lock.json ./
RUN npm i "prisma@$(node -p "require('./package-lock.json').packages['node_modules/prisma'].version")"
RUN npm i "bcrypt@$(node -p "require('./package-lock.json').packages['node_modules/bcrypt'].version")"
RUN npm cache clean --force
RUN rm package-lock.json

# Do not run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/app/data/placeholder-data.js ./app/data/placeholder-data.js

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

CMD [ "npm", "run", "docker:prod" ]