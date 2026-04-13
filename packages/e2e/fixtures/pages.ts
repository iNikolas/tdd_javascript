import { test as base } from "@playwright/test";

import { TodoPage } from "../pages/todo";

interface Fixtures {
  todoPage: TodoPage;
}

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    await use(todoPage);

    await todoPage.removeAll();
  },
});
