import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";

export class TodoPage {
  private readonly inputBox: Locator;
  private readonly todoItems: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator("input[name='new-todo']");
    this.todoItems = this.page.getByRole("table", { name: "to-do list" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press("Enter");
  }

  getTodoInputBox() {
    return this.inputBox;
  }

  getTodoItems() {
    return this.todoItems.getByRole("row");
  }

  async checkForRow(text: string) {
    const row = this.todoItems.getByRole("row", {
      name: new RegExp(`${text}`, "gi"),
    });

    await expect(row, `"${text}" to-do item didn't appear`).toBeVisible();
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel("Delete").click();
  }
}
