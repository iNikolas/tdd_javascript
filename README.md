## Required environment variables

**Place to `packages/shared/.env`**

```
DATABASE_URL=postgresql://postgres:1111@localhost:5432 // Postgresql DB URL
```

**Place to `packages/server/.env`**

```
PORT=3001
```

**Place to `packages/client.env`**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## How to run the project locally

1. Ensure `npm install` command is executed from the root folder
1. Start server instance with `npm run dev:server`
1. Start client instance with `npm run dev:client`
