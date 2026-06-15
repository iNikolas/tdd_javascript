import { toast } from "sonner";
import { createTodo } from "@/apis";
import { useMutation } from "@tanstack/react-query";

import { TodosResponse } from "shared/entities";

import { todosQueryKeys } from "../queries/todos";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    onMutate: async ({ listId, ...newTodo }, context) => {
      await context.client.cancelQueries({
        queryKey: todosQueryKeys.all(listId),
      });

      const previousTodos = context.client.getQueryData<TodosResponse["todos"]>(
        todosQueryKeys.all(listId),
      );

      context.client.setQueryData<TodosResponse["todos"]>(
        todosQueryKeys.all(listId),
        (old) => [...(old ?? []), { ...newTodo, id: new Date().toISOString() }],
      );

      return { previousTodos };
    },
    onError: (err, { listId }, onMutateResult, context) => {
      context.client.setQueryData(
        todosQueryKeys.all(listId),
        onMutateResult?.previousTodos,
      );
      toast.error(
        `Failed to create a to-do item ${err.message}. Please try again.`,
      );
    },
    onSettled: (_data, _error, { listId }, _onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: todosQueryKeys.all(listId),
      }),
  });
}
