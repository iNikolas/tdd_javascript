import type { DefinedInitialDataOptions } from "@tanstack/react-query";
import type { TodosResponse } from "shared/entities";

export interface TodosQueryOptions extends Partial<
  DefinedInitialDataOptions<TodosResponse["todos"]>
> {
  listId?: string;
}
