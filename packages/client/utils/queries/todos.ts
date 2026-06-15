import { queryOptions, useQuery } from "@tanstack/react-query";

import { getTodos } from "@/apis";

import type { TodosQueryOptions } from "./types";

export const todosQueryKeys = {
  all: (id?: string) => ["todos", id],
};

function getTodosQueryOptions(options: TodosQueryOptions = {}) {
  const { listId, ...otherOptions } = options;
  return queryOptions({
    queryKey: todosQueryKeys.all(listId),
    queryFn: async () => {
      if (!listId) {
        throw new Error("List ID is required to fetch todos.");
      }

      const response = await getTodos(listId);
      return response;
    },
    enabled: !!listId,
    ...otherOptions,
  });
}

export function useTodosQuery(options: TodosQueryOptions = {}) {
  return useQuery(getTodosQueryOptions(options));
}
