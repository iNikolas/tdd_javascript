import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { todoTable } from "shared/db";

import { dbUrl } from "./constants";

const db = drizzle(dbUrl, { schema: { todoTable } });

export type DB = typeof db;

export default db;
