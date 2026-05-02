import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FetchWithErrorOptions extends RequestInit {
  timeout?: number;
}

async function safeJsonParse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const text = await response.text();

  if (!text || text.trim() === "") {
    throw new Error(`Empty response received (Content-Type: ${contentType})`);
  }

  try {
    return JSON.parse(text);
  } catch {
    if (isJson) {
      throw new Error(
        `Invalid JSON response from server (Content-Type: ${contentType})`,
      );
    }

    const preview = text.substring(0, 200);
    throw new Error(
      `Non-JSON response received (Content-Type: ${contentType || "unknown"}). ` +
        `Preview: ${preview}${text.length > 200 ? "..." : ""}`,
    );
  }
}

export function extractErrorMessage(
  error: unknown,
  fallback = "Unknown Error",
): string {
  if (error == null) {
    return fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === "string") {
    return error.trim() || fallback;
  }

  if (typeof error === "object") {
    const errorObj = error as Record<string, unknown>;

    if (errorObj.error && typeof errorObj.error === "string") {
      return errorObj.error;
    }

    if (errorObj.error && typeof errorObj.error === "object") {
      const nestedError = errorObj.error;

      if (
        "message" in nestedError &&
        typeof nestedError.message === "string" &&
        nestedError.message
      ) {
        return nestedError.message;
      }

      if (typeof nestedError === "string" && nestedError) {
        return nestedError;
      }
    }

    if (typeof errorObj.message === "string" && errorObj.message) {
      return errorObj.message;
    }

    // Zod validation errors: { errors: [...] }
    if (Array.isArray(errorObj.errors) && errorObj.errors.length > 0) {
      const firstError = errorObj.errors[0];
      if (firstError && typeof firstError === "object") {
        const zodError = firstError as Record<string, unknown>;
        // Format: "field: message"
        const path = Array.isArray(zodError.path)
          ? zodError.path.join(".")
          : "field";
        const message = zodError.message || "validation error";
        return `${path}: ${message}`;
      }
    }

    try {
      const stringified = JSON.stringify(errorObj);
      if (stringified && stringified !== "{}" && stringified !== "[]") {
        return stringified;
      }
    } catch {}
  }

  if (typeof error === "number" || typeof error === "boolean") {
    return String(error);
  }

  return fallback;
}

export async function fetchWithError<T>(
  url: string,
  { body, headers, timeout = 30000, ...options }: FetchWithErrorOptions = {},
): Promise<T> {
  const controller = new AbortController();
  let timeoutId: NodeJS.Timeout | null = null;

  if (timeout > 0) {
    timeoutId = setTimeout(() => controller.abort(), timeout);
  }

  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...headers },
      body,
      credentials: "include",
      signal: controller.signal,
      ...options,
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const { status } = response;

      let data: unknown;
      try {
        data = await safeJsonParse(response);
      } catch (parseError) {
        throw new Error(
          `HTTP ${status}: ${response.statusText}. ${parseError instanceof Error ? parseError.message : "Failed to parse response"}`,
        );
      }

      const errorMessage = extractErrorMessage(
        data,
        `HTTP ${status}: ${response.statusText}`,
      );

      throw new Error(errorMessage);
    }

    const data = await safeJsonParse<T>(response);

    return data;
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Request timeout: The request to ${url} took longer than ${timeout}ms and was aborted. ` +
          `Please try again or contact support if this persists.`,
      );
    }

    throw error;
  }
}
