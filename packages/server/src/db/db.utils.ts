import { pushSchema } from 'drizzle-kit/api';
import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzleLite } from 'drizzle-orm/pglite';

import { dbSchema } from 'shared/db';

export async function initLiteDatabase() {
    const pgLite = new PGlite();

    const syncDb = drizzleLite(pgLite);

    const { apply } = await pushSchema(dbSchema, syncDb);
    await apply();

    const db = drizzleLite(pgLite, { schema: dbSchema });

    console.log(
        '🚀 In-memory PGlite database synchronized successfully (Push Mode)',
    );
    return db;
}
