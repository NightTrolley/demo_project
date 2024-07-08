import {test, expect} from "@playwright/test";
import {MainPage} from "../Pages/MainPage";
import {BasePage} from "../Pages/BasePage";
import {
    AGE_DIALOG,
    AGE_YES,
    CARD_CONTENT, FAVORITE_TV_SHELF, SHELF, SHELF_POSTER_ITEM,
    TV_SHELF,
    VIDEO_BANNER, VIDEO_BANNER_ACTIVE_ELEM,
    VIDEO_BANNER_LIST,
    VIDEO_SHELF
} from "../Utils/Locators";
import {LoginData} from "../Utils/LoginData";
import {ProfilePage} from "../Pages/ProfilePage";
import assert = require("node:assert");
import {AGE} from "../Utils/constants";

test("Главная. Баннер. Автоматическая смена баннера", async ({page}) => {
    const mainPage = new MainPage(page);
    const basePage = new BasePage(page);
    await test.step("Открыть главную и доскроллить до баннера", async () => {
        await mainPage.open_main_page()
        await basePage.auth(LoginData.user_without_sub)
        expect(await basePage.find_element(VIDEO_BANNER).scrollIntoViewIfNeeded())
    })
    await test.step("Дождаться смены баннера", async () => {
        let banner = basePage.find_element(VIDEO_BANNER_LIST).nth(2)
        await expect(banner).toBeInViewport({timeout: 0})
    })
})

test("Смена постера видеополки стрелками", async ({page}) => {
    const basePage = new BasePage(page);
    const mainPage = new MainPage(page);
    await test.step("Открыть главную, проскроллить до видеополки", async () => {
        await mainPage.open_main_page();
        await basePage.scrollToElem(VIDEO_SHELF)
        let elem_1 = await mainPage.get_carousel_active_element(VIDEO_SHELF)
        await mainPage.clickToArrow(VIDEO_SHELF)
        let elem_2 = await mainPage.get_carousel_active_element(VIDEO_SHELF)
        assert(elem_1 != elem_2, "Постер после клика не сменился")
    })
})

test("Главная. Детский режим. Фильтрация каналов", async ({page}) => {
    const basePage = new BasePage(page);
    const mainPage = new MainPage(page);
    const profilePage = new ProfilePage(page);
    await test.step("Авторизоваться. Переключить РК на 6+", async () => {
        await mainPage.open_main_page()
        await basePage.auth(LoginData.user_without_sub);
        await profilePage.changeParentControl(AGE["0+"])
        await basePage.changeTab("Главная")
        await basePage.scrollToElem(TV_SHELF)
    })
    await test.step("На Главной нет полки с ТВ-каналами", async () => {
        await expect(basePage.find_element(TV_SHELF)).not.toBeVisible({timeout: 0})
        await profilePage.changeParentControl(AGE["unlimited"])
        await basePage.logout()
    })
})

test("Главная. Видеополка. Переход к контенту", async ({page}) => {
    const basePage = new BasePage(page)
    const mainPage = new MainPage(page);
    await mainPage.open_main_page()
    await test.step("Проскроллить до видеополки. Нажать на постер в видеополке",
        async () => {
            await basePage.scrollToElem(VIDEO_SHELF)
            await (await mainPage.get_carousel_active_element(VIDEO_SHELF)).click()
            if (await basePage.checkModal(AGE_DIALOG)) {
                await basePage.find_element(AGE_YES).click()
            }
        })
    await test.step("Открыта карточка контента", async () => {
        await expect(basePage.find_element(CARD_CONTENT),
            "Карточка контента не открылась").toBeVisible()
    })
})

test("Главная. Отображение раздела. Авторизованный пользователь", async ({page}) => {
    const mainPage = new MainPage(page)
    const basePage = new BasePage(page);
    await mainPage.open_main_page();
    await basePage.auth(LoginData.user_without_sub)
    await test.step("Проверить отображение главной страницы.", async () => {
        await expect(basePage.find_element(VIDEO_BANNER),
            "Баннерная карусель не отображается").toBeVisible()
        await expect(basePage.find_element(SHELF).first(), "Не отображаются полки").toBeVisible()
        await basePage.scrollToElem(VIDEO_SHELF)
        await expect(basePage.find_element(VIDEO_SHELF), "Видеополка не отображается").toBeVisible()
    })
    await test.step("В полке категории проскроллить влево/вправо.", async () => {
        await basePage.find_element(SHELF).first().scrollIntoViewIfNeeded()
        let elem_1 = basePage.find_element(SHELF).locator(SHELF_POSTER_ITEM)
        await basePage.scroll_shelf_right(SHELF)
        await expect(elem_1, "Полка не проскроллилась").not.toBeInViewport()
        await new Promise(resolve => setTimeout(resolve, 1000))
        await basePage.scroll_shelf_left(SHELF)
        await expect(elem_1, "Полка не скроллится").toBeInViewport()
        await basePage.logout()
    })
})

test("Главная. Отображение раздела при отсутствии Любимых телеканалов",
    async ({page}) => {
        const basePage = new BasePage(page);
        const mainPage = new MainPage(page);
        await test.step("Перейти в раздел 'Главная' ", async () => {
            await mainPage.open_main_page()
            await basePage.auth(LoginData.user_without_sub)
            await expect(basePage.find_element(FAVORITE_TV_SHELF), "Отображается полка " +
                "с избранными каналами").not.toBeVisible()
        })
    })