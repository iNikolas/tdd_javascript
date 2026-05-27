import { Input } from "@/components/ui/input";
import { TodosList } from "./_components";

export default function Home() {
  return (
    <main className="p-4 w-full max-w-3xl mx-auto">
      <h2 className="prose">Your To-Do List</h2>
      <form aria-label="to-do form">
        <Input
          type="text"
          id="new-todo"
          name="new-todo"
          placeholder="Enter a to-do item"
        />
      </form>
      <TodosList />
    </main>
  );
}
