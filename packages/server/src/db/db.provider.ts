import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Inject, type Provider } from '@nestjs/common';

import { dbSchema } from 'shared/db';

export const InjectDb = () => Inject('DbProvider');

export const dbProvider: Provider = {
  provide: 'DbProvider',
  useFactory: (configService: ConfigService) => {
    const dbUrl = configService.get<string>('DATABASE_URL');

    if (!dbUrl) {
      throw new Error('Missing DATABASE_URL environment variable');
    }

    return drizzle(dbUrl, { schema: dbSchema });
  },
  inject: [ConfigService],
};
