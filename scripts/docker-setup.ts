import { execSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const LOCAL_VM_IP = "127.0.0.1";
const LOCAL_DB_PASSWORD = "local_dev_password";

process.env.VM_PUBLIC_IP = process.env.VM_PUBLIC_IP ?? LOCAL_VM_IP;
process.env.POSTGRES_PASSWORD =
  process.env.POSTGRES_PASSWORD ?? LOCAL_DB_PASSWORD;

const COMPOSE_DIR: string = process.env.COMPOSE_DIR ?? ".";

const run = (cmd: string, dir: string = process.cwd()): void => {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: dir });
};

async function setupEnvironment(): Promise<void> {
  try {
    console.log("🔨 Step 1: Building server container image...");
    run("docker build -t tdd_javascript/server:latest -f server.Dockerfile .");

    console.log("🔨 Step 2: Building frontend container image...");
    run(
      `docker build -t tdd_javascript/frontend:latest --build-arg NEXT_PUBLIC_API_URL="http://${process.env.VM_PUBLIC_IP}/api" --build-arg NEXT_PUBLIC_INTERNAL_API_URL="http://server:3001" -f client.Dockerfile .`,
    );

    console.log("🐘 Step 3: Starting the database...");
    run("docker compose up -d db", COMPOSE_DIR);

    console.log("⏳ Step 4: Waiting 10 seconds for Postgres to initialize...");
    await setTimeout(10000);

    console.log("🔄 Step 5: Running database migrations...");
    run("docker compose run --rm server npm run db:migrate", COMPOSE_DIR);

    console.log("🚀 Step 6: Starting the rest of the Docker Compose stack...");
    run("docker compose up -d", COMPOSE_DIR);

    console.log("\n✅ Environment is up and running!");
  } catch (error) {
    console.error("\n❌ An error occurred during setup. Aborting.");
    process.exit(1);
  }
}

setupEnvironment();
