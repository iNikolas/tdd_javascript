import { Suspense } from "react";

import { Input } from "@/components/ui/input";

import { TodosList, TodosListHead, TodosListSkeleton } from "./_components";

export default function Home() {
  return (
    <main className="p-4 w-full max-w-3xl mx-auto">
      <div className="prose mb-4">
        <h2>Your To-Do List</h2>
        <p>
          Manage your tasks and stay organized with your personalized to-do
          list. Add new items, mark them as complete, and keep track of your
          progress all in one place.
        </p>
      </div>
      <form aria-label="to-do form">
        <Input
          type="text"
          id="new-todo"
          name="new-todo"
          placeholder="Enter a to-do item"
        />
      </form>
      <TodosListHead>
        <Suspense fallback={<TodosListSkeleton />}>
          <TodosList />
        </Suspense>
      </TodosListHead>
    </main>
  );
}
