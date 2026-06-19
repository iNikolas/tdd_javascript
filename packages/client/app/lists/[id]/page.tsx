import React from "react";
import {
  Todos,
  TodosListHead,
  TodosListSkeleton,
  TodosList,
} from "@/components/containers/todos";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Todos listId={id} heading="Your To-Do list">
      <TodosListHead className="[&_table]:table-lg">
        <React.Suspense fallback={<TodosListSkeleton />}>
          <TodosList listId={id} />
        </React.Suspense>
      </TodosListHead>
    </Todos>
  );
}
