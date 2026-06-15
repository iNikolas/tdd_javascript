import { getTodos } from "@/apis";

import { TodosListClientView } from "./components";

export async function TodosList({ listId }: { listId?: string }) {
  const initialData = listId ? await getTodos(listId) : [];

  return <TodosListClientView initialData={initialData} listId={listId} />;
}
