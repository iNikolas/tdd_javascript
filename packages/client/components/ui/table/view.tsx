import { cn } from "@/utils";

import { TableProps } from "./types";

export function Table({ className, heads, children, ...props }: TableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="table" {...props}>
        {/* head */}
        {heads && (
          <thead>
            <tr>
              {heads.map(({ key, ...props }) => (
                <th key={key} {...props} />
              ))}
            </tr>
          </thead>
        )}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
