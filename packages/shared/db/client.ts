import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { dbUrl } from "./constants";
import { todoTable } from "./schema";

const db = drizzle(dbUrl, { schema: { todoTable } });

export type DB = typeof db;

export default db;
