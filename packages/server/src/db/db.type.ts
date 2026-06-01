import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { dbSchema } from 'shared/db';

export type DB = NodePgDatabase<typeof dbSchema>;
