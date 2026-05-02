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
    await this.page.goto("http://localhost:3000/");
  }

  async addToDo(text: string, { timeout = 1000 } = {}) {
    await this.inputBox.fill(text);
    await this.inputBox.press("Enter");

    this.page.waitForTimeout(timeout);
  }

  getTodoInputBox() {
    return this.inputBox;
  }

  getTodoItems() {
    return this.todoItems.getByRole("row");
  }

  checkForRow(text: string) {
    const row = this.todoItems.getByRole("row", {
      name: new RegExp(`${text}`, "gi"),
    });

    expect(row, `"${text}" to-do item didn't appear`).toBeVisible();
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel("Delete").click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel("Delete").first().click();
    }
  }
}
