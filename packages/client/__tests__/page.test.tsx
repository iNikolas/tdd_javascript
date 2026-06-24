import { v4 as uuid4 } from "uuid";
import { expect, suite, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { extractErrorMessage, getEnv } from "shared/utils";

import { createTodo, getTodos } from "@/apis";
import { CreateTodoInput } from "@/components/containers/todos/components";
import { TodosListClientView } from "@/components/containers/todos/components/todos-list/components";

import Page from "../app/page";

const clientUrl = getEnv("TEST_CLIENT_URL");

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
      <CreateTodoInput />
    </QueryClientProvider>,
  );

  const form = screen.getByRole("form", { name: /to-do form/i });
  const input = form.querySelector("input[name='new-todo']");
  expect(form, "Form must be rendered").toBeDefined();
  expect(input != null, "Input must be rendered").toBeTruthy();

  cleanup();
});

test("Can save a POST request", async () => {
  const text = "New Item Test";

  try {
    const response = await createTodo({ text });

    const next = await getTodos(response.listId);

    expect(next.length, "New todo must be added to the list").toBe(1);

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

  const { listId } = await createTodo({ text: items[0] });

  await Promise.all(items.slice(1).map((text) => createTodo({ text, listId })));

  const next = await getTodos(listId);

  expect(next.length, "New todo must be added to the list").toBe(items.length);

  items.forEach((text) => {
    expect(
      JSON.stringify(next),
      `Successful response must contain "${text}" and to be serialized`,
    ).toContain(text);
  });
});

test("Cannot save an empty item", async () => {
  try {
    await createTodo({ text: "" });
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

  const { listId } = await createTodo({ text: items[0] });

  const [response] = await Promise.all(
    items.slice(1).map((text) => createTodo({ text, listId })),
  );

  const initialData = await getTodos(response.listId);

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

test("Displays only items for that list", async () => {
  const items = [uuid4(), uuid4(), uuid4(), uuid4()];
  const otherItems = [uuid4(), uuid4()];

  const { listId } = await createTodo({ text: items[0] });

  await Promise.all([
    ...items.slice(1).map((text) => createTodo({ text, listId })),
    ...otherItems.map((text) => createTodo({ text })),
  ]);

  const initialData = await getTodos(listId);

  expect(
    initialData.length,
    `Initial data must contain ${items.length} items`,
  ).toBe(items.length);

  items.forEach((text) => {
    expect(
      initialData.find((item) => item.text === text),
      `Successful response must contain "${text}" and to be serialized`,
    ).toBeDefined();
  });

  otherItems.forEach((text) => {
    expect(
      initialData.find((item) => item.text === text),
      `Successful response must not contain "${text}" and to be serialized`,
    ).toBeUndefined();
  });
});
