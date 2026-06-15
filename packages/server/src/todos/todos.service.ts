import { Injectable } from '@nestjs/common';
import { listTable, todoTable } from 'shared/db';
import { eq } from 'drizzle-orm';
import { InjectDb } from '../db/db.provider';
import {
  CreateTodoDto,
  UpdateTodoDto,
  CreateTodoResponse,
  TodosResponse,
  Todo,
} from 'shared/entities';
import type { DB } from 'src/db/db.type';

@Injectable()
export class TodosService {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(
    createTodoDto: CreateTodoDto,
    listId?: string,
  ): Promise<CreateTodoResponse> {
    const getListId = async () => {
      if (!listId) {
        const [{ id }] = await this.db.insert(listTable).values({}).returning();

        return id;
      }

      return listId;
    };

    const [{ listId: listIdDefined, ...todo }] = await this.db
      .insert(todoTable)
      .values({ ...createTodoDto, listId: await getListId() })
      .returning();

    return { data: todo, listId: listIdDefined };
  }

  async findAll(id: string): Promise<TodosResponse> {
    const todos = await this.db
      .select({ id: todoTable.id, text: todoTable.text })
      .from(todoTable)
      .where(eq(todoTable.listId, id));
    return { todos };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
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
