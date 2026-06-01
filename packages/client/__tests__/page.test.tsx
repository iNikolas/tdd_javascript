import { v4 as uuid4 } from "uuid";
import { expect, suite, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CreateTodoResponse, TodosResponse } from "shared/entities";
import { fetchWithError, extractErrorMessage, getEnv } from "shared/utils";

import { getTodos } from "@/apis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodosListClientView } from "@/app/_components/todos-list/components";

import Page from "../app/page";

const clientUrl = getEnv("TEST_CLIENT_URL");
const apiUrl = getEnv("TEST_API_URL");

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

test("Application must have correct title", () => {
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <Page />
    </QueryClientProvider>,
  );
  expect(
    screen.getByRole("heading", { level: 2, name: /to-do/i }),
  ).toBeDefined();

  cleanup();
});

suite("Application must have correct HTML content", async () => {
  const result = await fetch(clientUrl, {
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
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <Page />
    </QueryClientProvider>,
  );

  const form = screen.getByRole("form", { name: /to-do form/i });
  const input = form.querySelector("input[name='new-todo']");
  expect(form, "Form must be rendered").toBeDefined();
  expect(input != null, "Input must be rendered").toBeTruthy();

  cleanup();
});

test("Renders todos table", () => {
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <Page />
    </QueryClientProvider>,
  );

  const table = screen.getByRole("table", {
    name: /to-do list/i,
    hidden: false,
  });

  expect(table, "Todo table must be rendered").toBeDefined();

  cleanup();
});

test("Can save a POST request", async () => {
  const text = "New Item Test";

  const { todos: previous } = await fetchWithError<TodosResponse>(
    `${apiUrl}/todos`,
  );

  try {
    const response = await fetchWithError<CreateTodoResponse>(
      `${apiUrl}/todos`,
      {
        method: "POST",
        body: JSON.stringify({ text }),
      },
    );

    const { todos: next } = await fetchWithError<TodosResponse>(
      `${apiUrl}/todos`,
    );

    expect(next.length, "New todo must be added to the list").toBe(
      previous.length + 1,
    );

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

test("Can save multiple items", async () => {
  const items = ["Item 1", "Item 2", "Item 3"];

  const { todos: previous } = await fetchWithError<TodosResponse>(
    `${apiUrl}/todos`,
  );

  await Promise.all(
    items.map((text) =>
      fetchWithError<CreateTodoResponse>(`${apiUrl}/todos`, {
        method: "POST",
        body: JSON.stringify({ text }),
      }),
    ),
  );

  const { todos: next } = await fetchWithError<TodosResponse>(
    `${apiUrl}/todos`,
  );

  expect(next.length, "New todo must be added to the list").toBe(
    previous.length + items.length,
  );

  items.forEach((text) => {
    expect(
      JSON.stringify(next),
      `Successful response must contain "${text}" and to be serialized`,
    ).toContain(text);
  });
});

test("Cannot save an empty item", async () => {
  try {
    await fetchWithError<CreateTodoResponse>(`${apiUrl}/todos`, {
      method: "POST",
      body: JSON.stringify({ text: "" }),
    });
  } catch (error) {
    expect(
      error,
      `Must throw an error: ${extractErrorMessage(error)}`,
    ).toBeDefined();
  }
});

test("Display all list items straight away", async () => {
  const items = [
    `Random List Item ${uuid4()}`,
    `Random List Item ${uuid4()}`,
    `Random List Item ${uuid4()}`,
  ];

  await Promise.all(
    items.map((text) =>
      fetchWithError<CreateTodoResponse>(`${apiUrl}/todos`, {
        method: "POST",
        body: JSON.stringify({ text }),
      }),
    ),
  );

  const initialData = await getTodos();

  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <TodosListClientView initialData={initialData} />
    </QueryClientProvider>,
  );

  items.forEach((text) => {
    expect(
      screen.getByText(text),
      `Newly added item "${text}" must be displayed`,
    ).toBeDefined();
  });

  cleanup();
});
