import type { todoTable } from "../../db";

type Todo = typeof todoTable.$inferSelect;

export type CreateTodoResponse = Todo;

export interface TodosResponse {
  todos: Todo[];
}
