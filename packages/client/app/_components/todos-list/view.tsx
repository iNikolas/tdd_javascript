"use client";

import { Table } from "@/components/ui/table";
import { useErrorToast } from "@/utils/hooks";
import { useTodosQuery } from "@/utils/queries/todos";
import type { TableProps } from "@/components/ui/table";

export function TodosList({ ...props }: TableProps) {
  const { data, isLoading, error } = useTodosQuery();

  useErrorToast(error);
  return (
    <Table
      aria-label="to-do list"
      heads={[
        { key: "number", children: "#" },
        { key: "text", children: "Text", className: "w-full" },
      ]}
      {...props}
    >
      {isLoading || (!data && error)
        ? Array.from({ length: 5 }).map((_, index) => (
            <tr key={`skeleton-${index}`}>
              <td>
                <p>{index + 1}</p>
              </td>
              <td>
                <p
                  className="skeleton h-4"
                  style={{
                    width: `${index * 5 * (index % 2 ? 1 : -1) + 40}%`,
                  }}
                />
              </td>
            </tr>
          ))
        : data?.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.text}</td>
            </tr>
          ))}
    </Table>
  );
}
