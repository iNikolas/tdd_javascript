import type { todoTable } from "../../db";

export type Todo = Omit<typeof todoTable.$inferSelect, "listId">;

export type CreateTodoResponse = { data: Todo; listId: string };

export interface TodosResponse {
  todos: Todo[];
}
