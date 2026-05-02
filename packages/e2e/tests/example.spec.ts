import { expect } from "@playwright/test";

import { test } from "../fixtures/pages";

test.describe("Can start a to-do list", () => {
  test("has a title and header", async ({ todoPage }) => {
    const page = todoPage.page;

    await expect(page).toHaveTitle(/to-do/gi);
    await expect(page).toHaveTitle(/tdd javascript/gi);

    const header = page.getByRole("heading", { name: /to-do/gi });
    await expect(header).toBeVisible();
  });

  test("user invited to enter a to-do item straight away", async ({
    todoPage,
  }) => {
    await expect(todoPage.getTodoInputBox()).toBeVisible();
    await expect(todoPage.getTodoInputBox()).toHaveAttribute(
      "placeholder",
      "Enter a to-do item",
    );

    const text = "Buy Peacock feathers";

    await test.step(`User Types "${text}" into a text box`, async () => {
      await todoPage.addToDo(text);
      todoPage.checkForRow(text);
    });

    const secondText = "Use peacock feathers to make a fly";

    await test.step(`There is still a textbox inviting User to Add another Item. User enters "${secondText}"`, async () => {
      await todoPage.addToDo(secondText);

      todoPage.checkForRow(text);
      todoPage.checkForRow(secondText);
    });
  });
});
