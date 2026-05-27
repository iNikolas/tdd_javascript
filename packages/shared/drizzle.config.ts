import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { dbUrl } from "./db";

export default defineConfig({
  out: "./drizzle",
  schema: ["./db/schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
