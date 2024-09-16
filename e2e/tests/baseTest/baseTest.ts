import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { BrowsersEnum } from "../../enums/browserEnum";
import { UrlsEnum } from "../../enums/urlEnum";
import { HomePage } from "../../pages/homePage";

export class BaseTest {
    private readonly headless: boolean = false;
    private runingDrivers: Browser[] = [];
    public driver1: Browser;
    public browserContext1: BrowserContext;
    public page1: Page;
    public driver2: Browser;
    public browserContext2: BrowserContext;
    public page2: Page;
    
    public async createBrowser(browserName: BrowsersEnum) {
        switch (browserName) {
            case BrowsersEnum.Browser_1: {
                this.driver1 = await chromium.launch({ headless: this.headless });
                this.runingDrivers.push(this.driver1);
                this.browserContext1 = await this.driver1.newContext();
                this.page1 = await this.browserContext1.newPage();

                return this.page1;
            }
            case BrowsersEnum.Browser_2: {
                this.driver2 = await chromium.launch({ headless: this.headless });
                this.runingDrivers.push(this.driver2);
                this.browserContext2 = await this.driver2.newContext();
                this.page2 = await this.browserContext2.newPage();

                return this.page2;
            }
            default:{
                throw new Error('Provide correct driver');
            }
        }
    }

    public async closeDrivers() {
        for (let driver of this.runingDrivers) {
            await driver.close();
        }

        this.runingDrivers = [];
    }
}

export const baseTest = new BaseTest();