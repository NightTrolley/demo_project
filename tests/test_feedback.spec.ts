import {test, Page, expect} from "@playwright/test";
import {BasePage} from "../Pages/BasePage";
import {FEEDBACK_EMAIL_INPUT, FEEDBACK_PAGE_URL} from "../Utils/Locators";
import {INCORRECT_EMAIL, INCORRECT_EMAIL_ERROR} from "../Utils/constants";

test("Ввод некорректного email", async ({page}) => {
    let basePage = new BasePage(page)
    await test.step("Открыть страницу 'Отправить сообщение'", async () => {
        await basePage.open_page(FEEDBACK_PAGE_URL)
    })
    await test.step("Ввести некорректный email", async () => {
        await basePage.find_element(FEEDBACK_EMAIL_INPUT).fill(INCORRECT_EMAIL)
    })
    await test.step("Отображается ошибка некорректного email", async () => {
        await expect(basePage.page.getByText(INCORRECT_EMAIL_ERROR), "Ошибка не отображается").toBeVisible()
    })

    await page.pause()
})