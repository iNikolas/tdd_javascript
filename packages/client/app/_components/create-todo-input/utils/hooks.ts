import React from "react";

import { useCreateTodoMutation } from "@/utils/mutations/todos";

export function useInputMutationState() {
  const [value, setValue] = React.useState("");
  const { mutate, variables, error } = useCreateTodoMutation();

  const prevText = variables?.text ?? "";

  React.useEffect(() => {
    if (error) {
      setValue((previousValue) => previousValue || prevText);
    }
  }, [error, prevText]);

  return {
    value,
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({ text: value });
      setValue("");
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
      setValue(e.target.value),
  };
}
