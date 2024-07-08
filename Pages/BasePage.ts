import {expect, Locator, Page} from "@playwright/test";
import {
    AGE_DIALOG,
    AUTHORIZE_BUTTON_FROM_HEADER, LEFT_ARROW, LOGOUT_BUTTON, LOGOUT_MODAL, LOGOUT_YES, MODAL_CLOSE_BUTTON,
    MTS_LOGIN_FORM,
    MTS_LOGIN_INPUT,
    MTS_LOGIN_OTP_INPUT,
    MTS_LOGIN_PAGE_LOGIN_BUTTON, MY_PROFILE_BUTTON, PREMIUM_MODAL, RIGHT_ARROW, SHELF, SHELF_POSTER_ITEM,
} from "../Utils/Locators";

export class BasePage{

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Найти элемент по локатору
    find_element(locator: string){
        return this.page.locator(locator)
    }

    // Открыть произвольную страницу
    async open_page(url: string){
        await this.page.goto(url);
    }

    async element_is_checked(locator: string){
        return await this.page.locator(locator).isChecked()
    }

    // Клик по элементу. Принимает локатор в виде строки
    async click_to_elem(locator: string){
        await this.page.locator(locator).click()
    }

    async element_visible(locator: string){
        await this.page.locator(locator).isVisible()
    }

    async changeTab(tabName: string){
        await this.page.locator('web-header').getByRole('link', { name: tabName }).click()
    }

    //TODO: Подумать о необходимости перенести метод в другой файл
    async scroll_shelf_right(shelf_locator: string){
        let shelf = this.find_element(shelf_locator).first()
        await shelf.locator(RIGHT_ARROW).click()
    }

    async scroll_shelf_left(shelf_locator: string){
        let shelf = this.find_element(shelf_locator).first()
        await shelf.locator(LEFT_ARROW).click()
    }

    async scrollToElem(locator: string){
        while(!await this.page.locator(locator).isVisible()){
            await this.page.mouse.wheel(0, 300)
            let scrollHeight = await this.page.evaluate(() => {
                return window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight;
            })
            if (scrollHeight === true){
                break;
            }
        }
        //await this.page.locator(locator).scrollIntoViewIfNeeded()
    }

    async checkModal(locator: string){
        //Таймаут добавлен из-за fade эффекта на модалке
        await new Promise(resolve => setTimeout(resolve, 500))
        return await this.page.locator(AGE_DIALOG).isVisible()
    }

    async logout(){
        await this.find_element(MY_PROFILE_BUTTON).click()
        await this.find_element(LOGOUT_BUTTON).click()
        await this.find_element(LOGOUT_MODAL).locator(LOGOUT_YES).click()
    }

    async checkPremiumModal(){
        return await this.find_element(PREMIUM_MODAL).isVisible()
    }

    /**
    * Метод авторизации
    * Принимает в себя объект авторизационных данных
    */
    async auth(authData: any){
        let phone: string
        let otp: string
        authData.forEach((e) => {
            phone = e.phone;
            otp = e.otp;
        })
        await this.find_element(AUTHORIZE_BUTTON_FROM_HEADER).click()
        await expect(this.find_element(MTS_LOGIN_FORM)).toBeVisible();
        await this.find_element(MTS_LOGIN_INPUT).fill(phone)
        await this.find_element(MTS_LOGIN_PAGE_LOGIN_BUTTON).click()
        await this.find_element(MTS_LOGIN_OTP_INPUT).fill(otp)
        if (await this.checkPremiumModal()){
            await this.find_element(MODAL_CLOSE_BUTTON).click()
        }
    }

}