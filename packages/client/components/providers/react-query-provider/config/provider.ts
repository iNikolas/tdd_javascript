import React from "react";
import { QueryClient } from "@tanstack/react-query";

export function useQueryClient() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  return queryClient;
}
