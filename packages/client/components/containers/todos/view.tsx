import { cn } from "@/utils";

import { TodosProps } from "./types";
import { CreateTodoInput } from "./components";

export function Todos({
  className,
  heading,
  listId,
  children,
  ...props
}: TodosProps) {
  return (
    <main
      className={cn(
        "container h-screen scroll-auto flex flex-col p-4 mx-auto",
        className,
      )}
      {...props}
    >
      <section className="w-full max-w-2xl bg-base-200 p-5 rounded-lg mx-auto mb-4 shadow-lg">
        <h2 className="text-7xl font-light mb-4 text-center">{heading}</h2>
        <CreateTodoInput listId={listId} />
      </section>
      {children}
    </main>
  );
}
