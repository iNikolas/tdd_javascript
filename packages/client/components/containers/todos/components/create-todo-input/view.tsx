"use client";

import { Input } from "@/components/ui/input";

import { CreateTodoInputProps } from "./types";
import { useInputMutationState } from "./utils";

export function CreateTodoInput({
  className,
  listId,
  ...props
}: CreateTodoInputProps) {
  const { value, onSubmit, onChange } = useInputMutationState(listId);

  return (
    <form aria-label="to-do form" className={className} onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={onChange}
        type="text"
        id="new-todo"
        name="new-todo"
        placeholder="Enter a to-do item"
        {...props}
      />
    </form>
  );
}
