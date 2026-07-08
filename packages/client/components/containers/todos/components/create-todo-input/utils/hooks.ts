import React from "react";
import { useRouter } from "next/navigation";

import { useCreateTodoMutation } from "@/utils/mutations/todos";

export function useInputMutationState(listId?: string) {
  const router = useRouter();

  const [value, setValue] = React.useState("");
  const { mutateAsync, variables, error, ...other } = useCreateTodoMutation();

  const prevText = variables?.text ?? "";

  React.useEffect(() => {
    if (error) {
      setValue((previousValue) => previousValue || prevText);
    }
  }, [error, prevText]);

  return {
    value,
    error,
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutateAsync({ text: value, listId }).then(({ listId: newListId }) => {
        if (!listId) {
          router.push(`/lists/${newListId}`);
        }
      });
      setValue("");
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
      setValue(e.target.value),
    ...other,
  };
}
