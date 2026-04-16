import { expect } from "@playwright/test";

import { test } from "../fixtures/pages";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/tdd javascript/gi);

  await expect(page).toHaveTitle(/to-do/gi);
});

test("User invited to enter to-do item straight away", async ({
  page,
  todoPage,
}) => {
  // User Types "Buy Peackok feathers" into a text box
  // When User hits Enter the page Updates and now Page lists
  // "1: Buy Peackok feathers" as an item in a to-do list
  // There is still a textbox inviting User to Add another Item
  // User enters "Use peackok feathers to make a fly"
  // The page updates again and now shows both items in the list
  await todoPage.addToDo("something nice");
  await expect(page.getByTestId("todo-title")).toContainText([
    "something nice",
  ]);
});

test("", async ({ page }) => {});
