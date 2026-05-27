import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { dbUrl } from "./constants";

const db = drizzle(dbUrl);

export type DB = typeof db;

export default db;
