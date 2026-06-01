import { ConfigService } from '@nestjs/config';
import { Inject, type Provider } from '@nestjs/common';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';

import { dbSchema } from 'shared/db';
import { initLiteDatabase } from './db.utils';

export const InjectDb = () => Inject('DbProvider');

export const dbProvider: Provider = {
  provide: 'DbProvider',
  useFactory: async (configService: ConfigService) => {
    const isTestEnv = configService.get<string>('NODE_ENV') === 'test';

    if (isTestEnv) {
      return await initLiteDatabase();
    }

    const dbUrl = configService.get<string>('DATABASE_URL');

    if (!dbUrl) {
      throw new Error('Missing DATABASE_URL environment variable');
    }

    return drizzleNode(dbUrl, { schema: dbSchema });
  },
  inject: [ConfigService],
};
