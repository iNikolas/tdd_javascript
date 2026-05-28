import { getTodos } from "@/apis";
import { TodosListClientView } from "./components";

export async function TodosList() {
  const initialData = await getTodos();

  return <TodosListClientView initialData={initialData} />;
}
