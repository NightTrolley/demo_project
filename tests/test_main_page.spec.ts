import {test, expect} from "@playwright/test";
import {MainPage} from "../Pages/MainPage";
import {BasePage} from "../Pages/BasePage";
import {VIDEO_BANNER, VIDEO_BANNER_LIST} from "../Utils/Locators";
import {LoginData} from "../Utils/LoginData";
import {ProfilePage} from "../Pages/ProfilePage";

test("main_page", async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.open_main_page()
})

test("authorize from header", async ({page}) => {
    const basePage = new BasePage(page);
    const mainPage = new MainPage(page);
    await mainPage.open_main_page();
    await basePage.auth(LoginData.user_without_sub);
})


test("check video banner", async ({page}) => {
    const mainPage = new MainPage(page);
    const basePage = new BasePage(page);
    await test.step("Открыть главную и доскроллить до баннера", async () => {
        await mainPage.open_main_page()
        expect(basePage.find_element(VIDEO_BANNER).scrollIntoViewIfNeeded())
    })
    await test.step("Дождаться смены баннера", async () => {
        let banner = basePage.find_element(VIDEO_BANNER_LIST).nth(2)
        await expect(banner).toBeInViewport({timeout:0})
    })
})

//TODO: Необходимо реализовать систему локаторов т.к. на данный момент видеополка и
// баннерная карусель не отличимы друг от друга
test.skip("Смена постера видеополки стрелками", async ({page}) => {
    const basePage = new BasePage(page);
    const mainPage = new MainPage(page);
    await test.step("Открыть главную, проскроллить до видеополки", async () => {
        await mainPage.open_main_page();
        await basePage.find_element("xpath=.//div[@class='banner-carousel-container'][1]")
            .scrollIntoViewIfNeeded()
        await page.pause()
    })
})

test("Главная. Детский режим. Фильтрация каналов", async ({page}) => {
    const basePage = new BasePage(page);
    const mainPage = new MainPage(page);
    const profilePage = new ProfilePage(page);
    await test.step("Авторизоваться. Переключить РК на 6+", async() => {
        await mainPage.open_main_page()
        await page.pause()
        await basePage.auth(LoginData.user_without_sub);
        await profilePage.changeParentControl("6+")
        await basePage.changeTab("Главная")
        await page.pause()
    })
})