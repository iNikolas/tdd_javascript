import { env } from "@/config";

export function getApiUrl() {
  return typeof window !== "undefined" ? env.apiUrl : env.internalApiUrl;
}
