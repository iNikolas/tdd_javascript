import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

import { test } from "../fixtures/pages";

test.describe("Item validation test", () => {
  test("Cannot add empty list items", async ({ todoPage }) => {
    // Edith goes to the home page and accidentally tries to submit
    // an empty list item. She hits Enter on the empty input box

    // The home page refreshes, and there is an error message saying
    // that list items cannot be blank

    // She tries again with some text for the item, which now works

    // Perversely, she now decides to submit a second blank list item

    // She receives a similar warning on the list page

    // And she can correct it by filling some text in
    throw new Error("Not implemented yet");
  });
});
