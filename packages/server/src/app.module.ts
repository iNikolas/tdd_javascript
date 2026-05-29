import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from './db/db.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TodosModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
