"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { QueryClientProviderProps } from "@tanstack/react-query";

import { queryClient } from "./config";

export function ReactQueryProvider({
  children,
  ...props
}: Partial<QueryClientProviderProps>) {
  return (
    <QueryClientProvider client={queryClient} {...props}>
      {children}
    </QueryClientProvider>
  );
}
