import { queryOptions, useQuery } from "@tanstack/react-query";

import { fetchWithError } from "shared/utils";
import type { TodosResponse } from "shared/entities";

import { env } from "@/config";

function getTodosQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetchWithError<TodosResponse>(
        `${env.apiUrl}/todos`,
      );
      return response.todos;
    },
  });
}

export function useTodosQuery() {
  return useQuery(getTodosQueryOptions());
}
