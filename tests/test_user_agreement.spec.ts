import {expect, test} from "@playwright/test";
import {BasePage} from "../Pages/BasePage";
import {
    AUTHORIZE_BUTTON_FROM_HEADER, USER_AGREEMENT_CHECKBOX,
    USER_AGREEMENT_TEXT,
    USER_AGREEMENT_TITLE,
    USER_AGREEMENT_URL
} from "../Utils/Locators";
import {LoginData} from "../Utils/LoginData";
import assert = require("node:assert");

test("UserAgreement Test", async ({page}) => {
    let basePage= new BasePage(page);
    await basePage.open_page(USER_AGREEMENT_URL)
    await basePage.click_to_elem(AUTHORIZE_BUTTON_FROM_HEADER)
    await basePage.auth(LoginData.user_without_sub)
    await test.step("Открыт раздел 'Пользовательское соглашение'", async () => {
        await test.step('Отображается заголовок', async () => {
            expect(basePage.element_visible(USER_AGREEMENT_TITLE))
        })
        await test.step('Отображается текст соглашения', async () => {
            expect(page.getByText(USER_AGREEMENT_TEXT).isVisible())
        })
        await test.step('Отображается чек-бокс. Чек-бокс выключен', async () => {
            expect(basePage.element_visible(USER_AGREEMENT_CHECKBOX))
            console.log(await basePage.element_is_checked(USER_AGREEMENT_CHECKBOX))
            expect(await basePage.element_is_checked(USER_AGREEMENT_CHECKBOX)).not.toBe("checked")
            assert(!await basePage.element_is_checked(USER_AGREEMENT_CHECKBOX), 'Чек-бокс по-умолчанию включен')
        })
    })
    await page.pause()
})