import { toast } from "sonner";
import { createTodo } from "@/apis";
import { useMutation } from "@tanstack/react-query";

import { TodosResponse } from "shared/entities";

import { todosQueryKeys } from "../queries/todos";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo, context) => {
      await context.client.cancelQueries({ queryKey: todosQueryKeys.all });

      const previousTodos = context.client.getQueryData<TodosResponse["todos"]>(
        todosQueryKeys.all,
      );

      context.client.setQueryData<TodosResponse["todos"]>(["todos"], (old) => [
        ...(old ?? []),
        { ...newTodo, id: new Date().toISOString() },
      ]);

      return { previousTodos };
    },
    onError: (err, _newTodo, onMutateResult, context) => {
      context.client.setQueryData(
        todosQueryKeys.all,
        onMutateResult?.previousTodos,
      );
      toast.error(
        `Failed to create a to-do item ${err.message}. Please try again.`,
      );
    },
    onSettled: (_data, _error, _variables, _onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: todosQueryKeys.all }),
  });
}
