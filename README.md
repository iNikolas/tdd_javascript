## Required environment variables

**Place to `packages/server/.env`**

```
PORT=3001 // For local development to eliminate port usage conflict with client
CLIENT_URL=http://localhost:3000 // Required explicitly for CORS protection
DATABASE_URL=postgresql://postgres:1111@localhost:5432 // Postgresql DB URL
```

**Place to `packages/client.env`**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## How to run the project locally

1. Ensure `npm install` command is executed from the root folder
2. Start server instance with `npm run dev:server`
3. Start client instance with `npm run dev:client`
4. Test application at `http://localhost:3000`

**For testing purposes** without Database persistence

1. You don't need an environment variables at all
2. Ensure all dependencies are installed with `npm install` from the root folder
3. Don't forget to build shared dependencies package: `npm run build:shared`
4. Run server with `npm run e2e:server` command
5. Run client with `npm run e2e:client` command
6. Navigate to `http://localhost:8000` to see the app

## Running test

For running test locally you need to ensure both client and server instances are initialized in test mode (without real database persistence):

```
npm run e2e:server
npm run e2e:client
```

Next populate `packages/client.env` with following environment variables

```
TEST_CLIENT_URL=http://localhost:8000
TEST_API_URL=http://localhost:8001
```

**Test commands**

1. Run client tests with `npm run test:client` command
2. Run server tests with `npm run test:server` command
3. Run integration test with Playwright via `npm run test:e2e` command

## How to run with Docker

If you have docker installed you can run both server and client with just one command and each time code have changed and you want to incorporate them into docker instances:

```
docker-compose up --build
```

Later on you can spin up same containers with following command:

```
docker-compose up
```

By default it starts local server with ephemeral database without persistence after shutting down the server
