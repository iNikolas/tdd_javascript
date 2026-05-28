"use client";

import { useErrorToast } from "@/utils/hooks";
import { useTodosQuery } from "@/utils/queries/todos";
import { TodosResponse } from "shared/entities";
import { TodosListSkeleton } from "../../todos-list-skeleton";

export function TodosListClientView({
  initialData,
}: {
  initialData: TodosResponse["todos"];
}) {
  const { data, isLoading, error } = useTodosQuery({ initialData });

  useErrorToast(error);
  return (
    <>
      {isLoading || (!data && error) ? (
        <TodosListSkeleton />
      ) : (
        data?.map((todo, index) => (
          <tr key={todo.id}>
            <td>{index + 1}</td>
            <td>{todo.text}</td>
          </tr>
        ))
      )}
    </>
  );
}
