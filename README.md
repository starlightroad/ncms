# NCMS - Network Circuit Management System

## Description

NCMS is a network circuit management system that allows you to keep track of circuits. It also allows you to track the vendors that own the circuits and where each circuit is located. When viewing a circuit, the A and Z locations are shown on a map.

## Tech Stack

- Next.js - React framework
- Tailwind CSS - CSS framework
- Shadcn - UI components
- Prisma - ORM library
- PostgreSQL - SQL database
- Mapbox GL JS - Interactive maps library
- Auth.js - Authentication library

## Getting Started

1. Clone the repo

```bash
git clone https://github.com/starlightroad/ncms.git
```

2. Install dependencies

```bash
npm i
```

3. Include your own environment variable values for Mapbox GL JS, PostgreSQL, and Auth.js.

```bash
DATABASE_URL=
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
AUTH_SECRET=
AUTH_URL=
```

4. Start the database using Docker Compose

```bash
docker compose up -d
```

5. Run the development server

```bash
npm run dev
```

## Building

1. Create the production build

```bash
npm run build
```

2. Run the production build

```bash
npm start
```

## Licensing

Providing credit by linking to my site would be appreciated.

## Contact

- https://gerardoortiz.dev
