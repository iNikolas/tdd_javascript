import React from "react";

export interface TodosProps extends React.HTMLAttributes<HTMLElement> {
  listId?: string;
  heading: React.ReactNode;
}
