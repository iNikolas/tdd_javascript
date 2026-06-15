import { Table } from "@/components/ui/table";
import type { TableProps } from "@/components/ui/table";

export function TodosListHead({ children, ...props }: TableProps) {
  return (
    <Table
      aria-label="to-do list"
      heads={[
        { key: "number", children: "#" },
        { key: "text", children: "Text", className: "w-full" },
      ]}
      {...props}
    >
      {children}
    </Table>
  );
}
