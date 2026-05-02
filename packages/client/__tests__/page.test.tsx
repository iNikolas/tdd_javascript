import { expect, suite, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import Page from "../app/page";
import { extractErrorMessage, fetchWithError } from "@/utils";

test("Application must have correct title", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", { level: 2, name: /to-do/i }),
  ).toBeDefined();

  cleanup();
});

suite("Application must have correct HTML content", async () => {
  const result = await fetch("http://localhost:3000", {
    method: "GET",
    headers: { "Content-Type": "text/html" },
  });

  test("Application must have correct status", () => {
    expect(result.status).toBe(200);
  });

  const html = await result.text();

  test("Document must start with doctype", () => {
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
  });

  test("Document must end with </html>", () => {
    expect(html.endsWith("</html>")).toBe(true);
  });

  test("Document must have correct title", () => {
    expect(html.match(/<title>.*TO-DO App.*<\/title>/i)?.length === 1).toBe(
      true,
    );
  });
});

test("Renders input form", () => {
  render(<Page />);

  const form = screen.getByRole("form", { name: /to-do form/i });
  const input = form.querySelector("input[name='new-todo']");
  expect(form, "Form must be rendered").toBeDefined();
  expect(input != null, "Input must be rendered").toBeTruthy();
});

test("Can save a POST request", async () => {
  const text = "New Item Test";

  try {
    const response = await fetchWithError("http://localhost:3001/todos", {
      method: "POST",
      body: JSON.stringify({ newTodo: text }),
    });

    expect(
      JSON.stringify(response),
      `Successful response must contain "${text}" and to be serialized`,
    ).toContain(text);
  } catch (error) {
    expect(
      error,
      `Must not throw an error: ${extractErrorMessage(error)}`,
    ).toBeUndefined();
  }
});
