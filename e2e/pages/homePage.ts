import { Page } from "@playwright/test";
import { UrlsEnum } from "../enums/urlEnum";
import { SearchResultPage } from "./searchResultPage";

export class HomePage {
    private searchField: string = 'store_nav_search_term';

    private page: Page;

    public static visit(page: Page): HomePage {
        page.goto(UrlsEnum.HomePage, { waitUntil: 'load' });

        return new HomePage(page);
    }

    constructor(page: Page) {
        this.page = page;
    }

    public async searchItem(textForSearch: string): Promise<SearchResultPage> {
        await this.page.getByTestId(this.searchField).waitFor( { state: 'visible' });
        await this.page.getByTestId(this.searchField).clear();
        await this.page.getByTestId(this.searchField).fill(textForSearch);
        await this.page.keyboard.press('Enter');

        return new SearchResultPage(this.page);
    }
}