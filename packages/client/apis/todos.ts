import { fetchWithError } from "shared/utils";
import type { CreateTodoResponse, TodosResponse } from "shared/entities";

import { getApiUrl } from "./utils";
import { CreateTodoData } from "./types";

export async function getTodos(id: string) {
  const response = await fetchWithError<TodosResponse>(
    `${getApiUrl()}/lists/${id}`,
  );
  return response.todos;
}

export async function createTodo({ listId, ...dto }: CreateTodoData) {
  const response = await fetchWithError<CreateTodoResponse>(
    `${getApiUrl()}/lists${listId ? `/${listId}` : ""}/${listId ? "add_item" : "new"}`,
    {
      method: "POST",
      body: JSON.stringify(dto),
    },
  );
  return response;
}
