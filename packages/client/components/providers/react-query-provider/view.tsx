"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { QueryClientProviderProps } from "@tanstack/react-query";

import { useQueryClient } from "./config";

export function ReactQueryProvider({
  children,
  ...props
}: Partial<QueryClientProviderProps>) {
  const client = useQueryClient();
  return (
    <QueryClientProvider client={client} {...props}>
      {children}
    </QueryClientProvider>
  );
}
