import { Global, Module } from '@nestjs/common';
import { dbProvider } from './db.provider';
import { provide } from './constants';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [{ provide, useFactory: (configService: ConfigService) => { } }],
  exports: [dbProvider],
})
export class DbModule { }
