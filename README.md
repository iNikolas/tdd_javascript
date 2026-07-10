## How to run the project locally in development mode

1. Ensure `npm install` command is executed from the root folder
2. Start server instance with `npm run dev:server`
3. Start client instance with `npm run dev:client`
4. Test application at `http://localhost:3000`

**Required environment variables. Place to `packages/server/.env`**

```
PORT=3001 // For local development to eliminate port usage conflict with client
CLIENT_URL=http://localhost:3000 // Required explicitly for CORS protection
DATABASE_URL=postgresql://postgres:1111@localhost:5432 // Postgresql DB URL
```

**Place to `packages/client.env`**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

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

## How to run production build with Docker

If you have docker installed you can run both server and client in fully fledged production mode locally with just one command (**no .env variables required**). Don't forget, Each time code have changed and you want to incorporate them into Docker instances:

```
npm run infra:setup
```

Later on you can spin up same containers with following command:

```
docker-compose up
```

You can visit web site just pasting into web browser: `http://localhost/`

**Run e2e tests against Production env locally**

```
BASE_URL=http://localhost npm run test:e2e
```
