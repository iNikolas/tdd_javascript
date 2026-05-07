import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import { dbUrl } from './src/db';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/schema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
