import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

import { test } from "../fixtures/pages";

test.describe("Item validation test", () => {
  test("Cannot add empty list items", async ({ todoPage }) => {
    await test.step("User goes to the home page and accidentally tries to submit an empty list item. He hits Enter on the empty input box", async () => {
      await todoPage.waitForPageLoad();
      await todoPage.addToDo("");
    });

    await test.step("The home page refreshes, and there is an error message saying that list items cannot be blank", async () => {
      await todoPage.testErrorMessageVisible();
    });

    await test.step("User tries again with some text for the item, which now works", async () => {
      const text = uuidv4();
      await todoPage.testAddToDo(text);
    });

    await test.step("Perversely, User now decides to submit a second blank list item and he receives a similar warning on the list page", async () => {
      await todoPage.addToDo("");
      await todoPage.testErrorMessageVisible();
    });

    await test.step("User can fill in some text for the second item, and it works", async () => {
      const text = uuidv4();
      await todoPage.testAddToDo(text);
    });
  });
});
