import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
