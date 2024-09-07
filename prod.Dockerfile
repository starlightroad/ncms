FROM node:20-alpine AS base

# Step 1 - Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY app ./app/
COPY public ./public
COPY next.config.mjs .
COPY prisma ./prisma
COPY tsconfig.json .
COPY auth.config.ts .
COPY auth.ts .
COPY components.json .
COPY middleware.ts .
COPY postcss.config.mjs .
COPY tailwind.config.ts .

# List any environment variables here
ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED 1

# Generate the Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Step 2 - Production image
FROM base AS runner

WORKDIR /app

# This package is needed to run the dockerfile-cmd:prod script
RUN npm i dotenv-cli -g

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

# List any environment variables here
ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED 1

CMD [ "npm", "run", "dockerfile-cmd:prod" ]