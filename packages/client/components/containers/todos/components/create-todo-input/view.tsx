"use client";

import { PiWarningCircle } from "react-icons/pi";

import { cn } from "@/utils";
import { Input } from "@/components/ui/input";

import { CreateTodoInputProps } from "./types";
import { useInputMutationState } from "./utils";

export function CreateTodoInput({
  className,
  listId,
  ...props
}: CreateTodoInputProps) {
  const { value, onSubmit, onChange, error, reset } =
    useInputMutationState(listId);

  return (
    <form
      aria-label="to-do form"
      className={cn(className, "flex justify-center mb-4")}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col w-full gap-2">
        <Input
          {...(!!error && {
            slots: [
              <PiWarningCircle
                key="warning-icon"
                className="text-error text-2xl"
              />,
            ],
          })}
          className={cn("input-lg w-full", !!error && "input-error")}
          value={value}
          onChange={(e) => {
            onChange(e);
            if (error) {
              reset();
            }
          }}
          type="text"
          id="new-todo"
          name="new-todo"
          placeholder="Enter a to-do item"
          {...(!!error && { "aria-invalid": true })}
          {...props}
        />
        {error && (
          <p className="text-error text-sm" role="alert">
            Error: {error.message}
          </p>
        )}
      </div>
    </form>
  );
}
