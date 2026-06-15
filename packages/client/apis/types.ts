import type { CreateTodoDto } from "shared/entities";

export interface CreateTodoData extends CreateTodoDto {
  listId?: string;
}
