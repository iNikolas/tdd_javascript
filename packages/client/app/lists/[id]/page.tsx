import { Todos } from "@/components/containers/todos";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Todos listId={id} heading="Your To-Do list" />;
}
