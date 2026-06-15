import React from "react";

export interface CreateTodoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  listId?: string;
}
