import { Injectable } from '@nestjs/common';
import { todoTable } from 'shared/db';
import { eq } from "drizzle-orm";
import { InjectDb } from '../db/db.provider';
import {
  CreateTodoDto,
  UpdateTodoDto,
  CreateTodoResponse,
  TodosResponse,
} from 'shared/entities';
import type { DB } from 'src/db/client';

@Injectable()
export class TodosService {
  constructor(@InjectDb() private readonly db: DB) { }

  async create(createTodoDto: CreateTodoDto): Promise<CreateTodoResponse> {
    const [todo] = await this.db
      .insert(todoTable)
      .values(createTodoDto)
      .returning();
    return todo;
  }

  async findAll(): Promise<TodosResponse> {
    const todos = await this.db.select().from(todoTable);
    return { todos };
  }

  async findOne(id: string): Promise<CreateTodoResponse> {
    const todo = await this.db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, id))
      .limit(1);
    return todo[0];
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<CreateTodoResponse> {
    const [todo] = await this.db
      .update(todoTable)
      .set(updateTodoDto)
      .where(eq(todoTable.id, id))
      .returning();
    return todo;
  }

  async remove(id: string) {
    await this.db.delete(todoTable).where(eq(todoTable.id, id));
    return { id };
  }
}
