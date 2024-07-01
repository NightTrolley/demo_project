/*
* Карточка контента
 */

import {Page} from "@playwright/test";
import {SIMILAR_SHELF} from "../Utils/Locators";

export class CardContentPage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    checkSimilarShelf(){
        return this.page.locator(SIMILAR_SHELF)
    }

}