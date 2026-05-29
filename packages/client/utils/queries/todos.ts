import {
  DefinedInitialDataOptions,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import { fetchWithError } from "shared/utils";
import type { TodosResponse } from "shared/entities";

import { env } from "@/config";

export const todosQueryKeys = {
  all: ["todos"] as const,
};

function getTodosQueryOptions(
  options: Partial<DefinedInitialDataOptions<TodosResponse["todos"]>> = {},
) {
  return queryOptions({
    queryKey: todosQueryKeys.all,
    queryFn: async () => {
      const response = await fetchWithError<TodosResponse>(
        `${env.apiUrl}/todos`,
      );
      return response.todos;
    },
    ...options,
  });
}

export function useTodosQuery(
  options: Partial<DefinedInitialDataOptions<TodosResponse["todos"]>> = {},
) {
  return useQuery(getTodosQueryOptions(options));
}
