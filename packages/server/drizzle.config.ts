import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { dbUrl } from "src/db/constants";

export default defineConfig({
  out: "./drizzle",
  schema: ["./db/schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
