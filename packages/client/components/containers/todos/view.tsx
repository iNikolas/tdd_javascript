import { Suspense } from "react";

import { cn } from "@/utils";

import {
  CreateTodoInput,
  TodosList,
  TodosListHead,
  TodosListSkeleton,
} from "./components";
import { TodosProps } from "./types";

export function Todos({ className, heading, listId, ...props }: TodosProps) {
  return (
    <main className={cn("p-4 w-full max-w-3xl mx-auto", className)} {...props}>
      <div className="prose mb-4">
        <h2>{heading}</h2>
        <p>
          Manage your tasks and stay organized with your personalized to-do
          list. Add new items, mark them as complete, and keep track of your
          progress all in one place.
        </p>
      </div>
      <CreateTodoInput listId={listId} />
      <TodosListHead>
        <Suspense fallback={<TodosListSkeleton />}>
          <TodosList listId={listId} />
        </Suspense>
      </TodosListHead>
    </main>
  );
}
