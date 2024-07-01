/*
* Объект основной страницы
 */
import {MAIN_PAGE_UL} from "../Utils/Locators";
import {expect, type Locator, type Page} from "@playwright/test";

export class MainPage{
    page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async open_main_page(){
        await this.page.goto(MAIN_PAGE_UL)
    }

}