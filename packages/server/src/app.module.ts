import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from './db/db.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, ConfigModule.forRoot(), DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
