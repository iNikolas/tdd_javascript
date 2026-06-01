import { pushSchema } from 'drizzle-kit/api';
import { ConfigService } from '@nestjs/config';
import { PGlite } from '@electric-sql/pglite';
import { Inject, type Provider } from '@nestjs/common';
import { drizzle as drizzleLite } from 'drizzle-orm/pglite';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';

import { dbSchema } from 'shared/db';

export const InjectDb = () => Inject('DbProvider');

export const dbProvider: Provider = {
  provide: 'DbProvider',
  useFactory: async (configService: ConfigService) => {
    const isTestEnv = configService.get<string>('NODE_ENV') === 'test';

    if (isTestEnv) {
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

    const dbUrl = configService.get<string>('DATABASE_URL');

    if (!dbUrl) {
      throw new Error('Missing DATABASE_URL environment variable');
    }

    return drizzleNode(dbUrl, { schema: dbSchema });
  },
  inject: [ConfigService],
};
