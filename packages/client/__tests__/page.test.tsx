import { expect, suite, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import Page from "../app/page";

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
  const input = form.querySelector("input[name='njew-todko']");
  console.log(input);
  expect(form, "Form must be rendered").toBeDefined();
  console.log(input instanceof React.Element);
  // expect(input.insta, "Input must be rendered").notT();
});
