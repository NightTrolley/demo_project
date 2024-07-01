import {CardContentPage} from "../Pages/CardContentPage";
import {test, expect, Page} from "@playwright/test";
import {log} from "node:util";

test("Check similar shelf is visible", async ({page}) => {
    await page.goto("https://kion.ru/video/movie/836551093")
    await new CardContentPage(page).checkSimilarShelf().scrollIntoViewIfNeeded()
})

test("Check similar shelf is visible", async ({page}) => {

})