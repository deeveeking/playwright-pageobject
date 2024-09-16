import { test, expect, Page } from "@playwright/test";
import { baseTest } from "../baseTest/baseTest";
import { BrowsersEnum } from "../../enums/browserEnum";
import { HomePage } from "../../pages/homePage";

let page: Page;

test.beforeEach(async () => {
    page = await baseTest.createBrowser(BrowsersEnum.Browser_1);
 });

 test("Product search work correctly", async () => {
    let textForSearch: string = 'Counter-Strike 2';
    const homePage = HomePage.visit(page);

    const searchResultPage = await homePage.searchItem(textForSearch);
    const resultItems = await searchResultPage.getSearchResults();

    expect(resultItems, 'Incorrect search results').toContain(textForSearch);
 });

 test.afterEach(async () => {
    await baseTest.closeDrivers();
 });