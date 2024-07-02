/*
* Объект основной страницы
 */
import {MAIN_PAGE_UL, RIGHT_ARROW, VIDEO_BANNER_ACTIVE_ELEM} from "../Utils/Locators";
import {expect, type Locator, type Page} from "@playwright/test";
import {secureHeapUsed} from "node:crypto";

export class MainPage{
    page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async open_main_page(){
        await this.page.goto(MAIN_PAGE_UL)
    }

    async clickToArrow(shelf_name: string){
        let shelf = this.page.locator(shelf_name)
        await shelf.locator(RIGHT_ARROW).click()
    }

    async get_carousel_active_element(shelf_name: string){
        let shelf = this.page.locator(shelf_name)
        return shelf.locator(VIDEO_BANNER_ACTIVE_ELEM)
    }

}