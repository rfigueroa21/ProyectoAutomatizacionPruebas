// Singleton BrowserManager for Playwright
import { chromium } from '@playwright/test';

class BrowserManager {
    static browser = null;
    static context = null;

    static async getBrowser() {
        if (!BrowserManager.browser) {
            BrowserManager.browser = await chromium.launch({ headless: false });
        }
        return BrowserManager.browser;
    }

    static async getContext() {
        if (!BrowserManager.context) {
            const browser = await BrowserManager.getBrowser();
            BrowserManager.context = await browser.newContext();
        }
        return BrowserManager.context;
    }

    static async closeAll() {
        if (BrowserManager.context) {
            await BrowserManager.context.close();
            BrowserManager.context = null;
        }
        if (BrowserManager.browser) {
            await BrowserManager.browser.close();
            BrowserManager.browser = null;
        }
    }
}

export default BrowserManager;
