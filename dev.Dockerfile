FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# This package is needed to run the dockerfile-cmd:dev  script
RUN npm i dotenv-cli -g

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

ENV NEXT_TELEMETRY_DISABLED 1

# Generate the Prisma client
RUN npx prisma generate

CMD [ "npm", "run", "dockerfile-cmd:dev" ]