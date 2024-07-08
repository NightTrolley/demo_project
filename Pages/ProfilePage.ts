/**
 * Объект страницы профиля
 */
import {Page} from "@playwright/test";
import {
    MY_PROFILE,
    MY_PROFILE_BUTTON,
    PARENT_CONTROL,
    PIN_CODE_INPUT,
    SAVE_PARENT_CONTROL
} from "../Utils/Locators";
import {DEFAULT_PIN_CODE} from "../Utils/constants";

export class ProfilePage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async changeParentControl(age: string[]) {
        await this.page.locator(MY_PROFILE_BUTTON).click()
        await this.page.locator(PARENT_CONTROL).click()
        await this.page.getByText(age.toString()).click()
        await this.page.locator(SAVE_PARENT_CONTROL).click()
        await this.page.locator(PIN_CODE_INPUT).pressSequentially(DEFAULT_PIN_CODE)
    }
}