import { fetchWithError } from "shared/utils";
import type {
  CreateTodoDto,
  CreateTodoResponse,
  TodosResponse,
} from "shared/entities";

import { env } from "@/config";

export async function getTodos() {
  const response = await fetchWithError<TodosResponse>(`${env.apiUrl}/todos`);
  return response.todos;
}

export async function createTodo(dto: CreateTodoDto) {
  const response = await fetchWithError<CreateTodoResponse>(
    `${env.apiUrl}/todos`,
    {
      method: "POST",
      body: JSON.stringify(dto),
    },
  );
  return response;
}
