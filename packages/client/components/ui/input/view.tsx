import { cn } from "@/utils";

import { InputProps } from "./types";

export function Input({ className, children, slots, ...props }: InputProps) {
  return (
    <label className={cn("input", className)}>
      {children}
      <input className="grow" {...props} />
      {slots?.[0]}
    </label>
  );
}
