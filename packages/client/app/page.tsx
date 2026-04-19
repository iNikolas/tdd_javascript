import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";

export default function Home() {
  return (
    <main className="prose p-4 w-full max-w-3xl mx-auto">
      <h2>Your To-Do List</h2>
      <Input
        type="text"
        id="new-todo"
        name="new-todo"
        placeholder="Enter a to-do item"
      />
      <Table aria-label="to-do list" />
    </main>
  );
}
