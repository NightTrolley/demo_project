import {LoginData} from "../Utils/LoginData";
import {expect, test} from "@playwright/test";
import {BasePage} from "../Pages/BasePage";
import {
    AUTHORIZE_BUTTON_FROM_HEADER,
    MAIN_PAGE_UL,
    MY_PROFILE,
    PARENT_CONTROL,
    PARENT_CONTROL_6, PIN_CODE_INPUT, SAVE_PARENT_CONTROL
} from "../Utils/Locators";
import {DEFAULT_PIN_CODE} from "../Utils/constants";


test("test login", async ({page}) => {
    let basePage = new BasePage(page)
    await test.step("Открыть главную и авторизоваться", async() => {
        await basePage.open_page(MAIN_PAGE_UL)
        await basePage.click_to_elem(AUTHORIZE_BUTTON_FROM_HEADER)
        await basePage.auth(LoginData.user_without_sub)
    })
    await test.step("Перейти в 'Мой профиль'", async () => {
        await basePage.click_to_elem(MY_PROFILE)
    })
    await test.step("Переключить родительский контроль на 0+", async() => {
        await basePage.click_to_elem(PARENT_CONTROL)
        await basePage.click_to_elem(PARENT_CONTROL_6)
        await basePage.click_to_elem(SAVE_PARENT_CONTROL)
        await basePage.find_element(PIN_CODE_INPUT).pressSequentially(DEFAULT_PIN_CODE)
        await page.pause()
    })

})



