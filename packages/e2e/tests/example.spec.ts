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
    const inputBox = todoPage.page.locator("input[name='new-todo']");
    await expect(inputBox).toBeVisible();
    await expect(inputBox).toHaveAttribute("placeholder", "Enter a to-do item");

    const text = "Buy Peacock feathers";

    await test.step(`User Types "${text}" into a text box`, async () => {
      await inputBox.fill(text);
    });

    await test.step(`When user hits enter the page updates and now Page lists "${text}" as an item in a to-do list`, async () => {
      await inputBox.press("Enter");

      todoPage.page.waitForTimeout(1000);

      const table = todoPage.page.getByRole("table", { name: "to-do list" });
      const row = table.getByRole("row", { name: new RegExp(`${text}`, "gi") });
      await expect(row).toBeVisible();
    });

    const secondText = "Use peacock feathers to make a fly";

    await test.step(`There is still a textbox inviting User to Add another Item. User enters "${secondText}"`, async () => {
      await inputBox.fill(secondText);
    });

    await test.step(`When user hits enter the page updates and now Page lists both "${text}" and "${secondText}" as items in a to-do list`, async () => {
      await inputBox.press("Enter");

      todoPage.page.waitForTimeout(1000);

      const table = todoPage.page.getByTestId("list-table");
      const firstRow = table.getByRole("row", {
        name: new RegExp(`${text}`, "gi"),
      });
      const secondRow = table.getByRole("row", {
        name: new RegExp(`${secondText}`, "gi"),
      });

      await expect(firstRow).toBeVisible();
      await expect(secondRow).toBeVisible();
    });
  });
});
