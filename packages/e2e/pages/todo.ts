import { v4 as uuidv4 } from "uuid";
import { expect, test } from "@playwright/test";
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

  async waitForPageLoad() {
    await expect(this.getTodoInputBox()).toBeVisible();
    await expect(this.getTodoInputBox()).toHaveAttribute(
      "placeholder",
      "Enter a to-do item",
    );
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press("Enter");
  }

  async testAddToDo(text = uuidv4()) {
    await test.step(`User Types "${text}" into a text box`, async () => {
      await this.addToDo(text);
      await this.checkForRow(text);
    });
  }

  async testErrorMessageVisible(text?: string | RegExp) {
    await expect(
      this.getTodoInputBox(),
      "Input must show invalid state",
    ).toHaveAttribute("aria-invalid", "true");

    const expectedText = text ?? /error:/i;

    const errorMessage = this.page
      .getByRole("alert")
      .filter({ hasText: expectedText });

    await expect(errorMessage, "Error message must be visible").toBeVisible();
    await expect(errorMessage, "Error message must be correct").toHaveText(
      expectedText,
    );
  }

  getTodoInputBox() {
    return this.inputBox;
  }

  getTodoItems() {
    return this.todoItems.locator("tbody tr");
  }

  getRowByText(text: string) {
    return this.todoItems.getByRole("row", {
      name: new RegExp(`${text}`, "gi"),
    });
  }

  async checkForRow(text: string) {
    const row = this.getRowByText(text);

    await expect(row, `"${text}" to-do item didn't appear`).toBeVisible();
  }

  async getInputBoundingBox() {
    const box = await this.getTodoInputBox().boundingBox();

    if (!box) {
      throw new Error("Input box not found");
    }

    return box;
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel("Delete").click();
  }
}
