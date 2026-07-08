import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

import { test } from "../fixtures/pages";

test.describe("Layout and styling", () => {
  test("Test Layout and styling", async ({ todoPage }) => {
    await todoPage.waitForPageLoad();

    await test.step("User browser window is resized to 1024x768", async () => {
      await todoPage.page.setViewportSize({ width: 1024, height: 768 });
    });

    const box = await todoPage.getInputBoundingBox();

    const pageWidth = todoPage.page.viewportSize()?.width ?? 0;
    const boxCenter = box.x + box.width / 2;

    expect(boxCenter, "User must see the input box is nicely centered").toBe(
      pageWidth / 2,
    );

    await test.step("User starts a new list and sees the input is nicely centered there too", async () => {
      const text = uuidv4();
      await todoPage.testAddToDo(text);
    });
  });
});
