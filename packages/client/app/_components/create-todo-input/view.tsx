"use client";

import React from "react";

import { Input } from "@/components/ui/input";

import { useInputMutationState } from "./utils";

export function CreateTodoInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { value, onSubmit, onChange } = useInputMutationState();

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
