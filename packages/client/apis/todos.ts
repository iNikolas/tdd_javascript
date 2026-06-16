import { fetchWithError } from "shared/utils";
import type { CreateTodoResponse, TodosResponse } from "shared/entities";

import { env } from "@/config";
import { CreateTodoData } from "./types";

export async function getTodos(id: string) {
  const response = await fetchWithError<TodosResponse>(
    `${env.apiUrl}/lists/${id}`,
  );
  return response.todos;
}

export async function createTodo({ listId, ...dto }: CreateTodoData) {
  const response = await fetchWithError<CreateTodoResponse>(
    `${env.apiUrl}/lists${listId ? `/${listId}` : ""}/${listId ? "add_item" : "new"}`,
    {
      method: "POST",
      body: JSON.stringify(dto),
    },
  );
  return response;
}
