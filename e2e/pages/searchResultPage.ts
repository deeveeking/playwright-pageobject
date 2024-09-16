import { Page } from "@playwright/test";

export class SearchResultPage {
    private resultsName: string = `div[class*='search_name ellipsis']`;

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async getSearchResults() {
        await this.page.locator(this.resultsName).nth(0).waitFor({ state: 'visible' });
        const elements = this.page.locator(this.resultsName);

        return elements.allInnerTexts();
    }
}