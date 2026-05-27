## Required environment variables

**Place to `shared/.env`**

```
DATABASE_URL=postgresql://postgres:1111@localhost:5432 // Postgresql DB URL
```

**Place to `server/.env`**

```
PORT=3001 // To eliminate port conflict between client and server instances, currently this port is hardcoded in some test suits, so don't change it mindlessly
```

## How to run the project locally

1. Ensure `npm install` command is executed from the root folder
1. Start server instance with `npm run dev:server`
1. Start client instance with `npm run dev:client`
