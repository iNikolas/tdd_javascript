import { fetchWithError } from "shared/utils";
import type { TodosResponse } from "shared/entities";

import { env } from "@/config";

export async function getTodos() {
  const response = await fetchWithError<TodosResponse>(`${env.apiUrl}/todos`);
  return response.todos;
}
