import { defineConfig } from "tsup";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  entry: ["db/index.ts", "utils/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  define: {
    "process.env.DATABASE_URL": JSON.stringify(process.env.DATABASE_URL),
  },
});
