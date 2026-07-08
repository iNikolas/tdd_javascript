import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

import { test } from "../fixtures/pages";

test.describe("New Visitor test", () => {
  test("Can start a to-do list", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.waitForPageLoad();

    await test.step("has a title and header", async () => {
      const page = todoPage.page;

      await expect(page).toHaveTitle(/to-do/gi);
      await expect(page).toHaveTitle(/tdd javascript/gi);

      const header = page.getByRole("heading", { name: /to-do/gi });
      await expect(header).toBeVisible();
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
        await expect(todoPage.page).toHaveURL(/\/lists\/.+/gi);

        const userUrl = todoPage.page.url();
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
        await expect(todoPage.page).toHaveURL(/\/lists\/.+/gi);

        const userUrl = todoPage.page.url();

        urls.thirdUser = userUrl;

        expect(userUrl, "Third user must have a different URL").not.toBe(
          urls.secondUser,
        );
      });

      await test.step("Again, there is no trace of the second user's list", async () => {
        const secondUsersTodoItemRow = todoPage.getRowByText(firstText);
        await expect(secondUsersTodoItemRow).toBeHidden();

        const thirdUsersTodoItemRow = todoPage.getRowByText(secondText);
        await expect(thirdUsersTodoItemRow).toBeVisible();
      });
    });
  });
});
