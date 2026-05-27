## Required environment variables

**Place to `packages/shared/.env`**

```
DATABASE_URL=postgresql://postgres:1111@localhost:5432 // Postgresql DB URL
```

**Place to `packages/server/.env`**

```
PORT=3001 // For local development to eliminate port usage conflict with client
CLIENT_URL=http://localhost:3000 // Required explicitly for CORS protection
```

**Place to `packages/client.env`**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## How to run the project locally

1. Ensure `npm install` command is executed from the root folder
2. Start server instance with `npm run dev:server`
3. Start client instance with `npm run dev:client`
