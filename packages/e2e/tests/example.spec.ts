import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

import { test } from "../fixtures/pages";

test.describe("Can start a to-do list", () => {
  test("has a title and header", async ({ todoPage }) => {
    const page = todoPage.page;

    await expect(page).toHaveTitle(/to-do/gi);
    await expect(page).toHaveTitle(/tdd javascript/gi);

    const header = page.getByRole("heading", { name: /to-do/gi });
    await expect(header).toBeVisible();
  });
});

test("user invited to enter a to-do item straight away", async ({
  todoPage,
}) => {
  await todoPage.waitForPageLoad();

  const text = uuidv4();

  await todoPage.testAddToDo(text);

  const secondText = uuidv4();

  await todoPage.testAddToDo(secondText);

  await test.step(`User sees both "${text}" and "${secondText}" in the list`, async () => {
    await todoPage.checkForRow(text);
    await todoPage.checkForRow(secondText);
  });
});

test("Multiple users can start lists at different urls", async ({
  todoPage,
}) => {
  const urls = { secondUser: "", thirdUser: "" };
  const firstText = uuidv4();

  await test.step("Second user starts a new to-do list", async () => {
    await todoPage.waitForPageLoad();

    await todoPage.testAddToDo(firstText);

    await test.step("Second user notices that his list has a unique URL", async () => {
      const userUrl = todoPage.page.url();

      await expect(todoPage.page).toHaveURL(/\/lists\/.+/gi);

      urls.secondUser = userUrl;
    });
  });

  await test.step("Now a new Third user, comes along to the site", async () => {
    await test.step("We delete all the browser's cookies as a way of simulating a brand new user session", async () => {
      await todoPage.page.context().clearCookies();
    });

    await test.step("Third user visits the home page. There is no sign of the previous user's list", async () => {
      await todoPage.goto();
      await todoPage.waitForPageLoad();
      await expect(todoPage.getTodoItems()).toHaveCount(0);
    });

    const secondText = uuidv4();

    await test.step("Third user starts a new list by entering a new item", async () => {
      await todoPage.testAddToDo(secondText);
    });

    await test.step("Third user gets his own unique URL", async () => {
      const userUrl = todoPage.page.url();

      await expect(todoPage.page).toHaveURL(/\/lists\/.+/gi);

      urls.thirdUser = userUrl;
      expect(userUrl).not.toBe(todoPage.page.url());
      expect(userUrl).not.toBe(urls.secondUser);
    });

    await test.step("Again, there is no trace of the second user's list", async () => {
      const secondUsersTodoItemRow = todoPage.getRowByText(firstText);
      await expect(secondUsersTodoItemRow).toBeHidden();

      const thirdUsersTodoItemRow = todoPage.getRowByText(secondText);
      await expect(thirdUsersTodoItemRow).toBeVisible();
    });
  });
});
