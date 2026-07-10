import { v4 as uuidv4 } from "uuid";

import { test } from "../fixtures/pages";

test.describe("Item validation test", () => {
  test("Cannot add empty list items", async ({ todoPage }) => {
    await test.step("User goes to the home page and accidentally tries to submit an empty list item. He hits Enter on the empty input box", async () => {
      await todoPage.waitForPageLoad();
      await todoPage.addToDo("");
    });

    await test.step("The home page refreshes, and there is an error message saying that list items cannot be blank", async () => {
      await todoPage.expectErrorMessageState("visible");
    });

    await test.step("User tries again with some text for the item, which now works", async () => {
      const text = uuidv4();
      await todoPage.expectAddToDo(text);
    });

    await test.step("Perversely, User now decides to submit a second blank list item and he receives a similar warning on the list page", async () => {
      await todoPage.addToDo("");
      await todoPage.expectErrorMessageState("visible");
    });

    await test.step("User can fill in some text for the second item, and it works", async () => {
      const text = uuidv4();
      await todoPage.expectAddToDo(text);
    });
  });

  test("Cannot add duplicate list items", async ({ todoPage }) => {
    const text = uuidv4();

    await test.step("User goes to the home page and adds a new list item", async () => {
      await todoPage.waitForPageLoad();
      await todoPage.expectAddToDo(text);
    });

    await test.step("User accidentally tries to enter a duplicate item", async () => {
      await todoPage.addToDo(text);
    });

    await test.step("User sees a helpful error message", async () => {
      await todoPage.expectErrorMessageState("visible");
    });
  });

  test("Error messages are cleared on input", async ({ todoPage }) => {
    await todoPage.waitForPageLoad();

    await test.step("User starts a list and causes a validation error", async () => {
      const text = uuidv4();

      await todoPage.expectAddToDo(text);
      await todoPage.addToDo(text);
      await todoPage.expectErrorMessageState("visible");
    });

    await test.step("User starts typing in the input box to clear the error", async () => {
      const newText = uuidv4();
      await todoPage.getTodoInputBox().fill(newText);
    });

    await test.step("User is pleased to see that the error message disappears", async () => {
      await todoPage.expectErrorMessageState("hidden");
    });
  });
});
