import { test, expect } from '@playwright/test';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import BrowserManager from '../core/BrowserManager.js';
import { captureScreenshot } from '../utils/screenshotHandler.js';
import { logError } from '../utils/logger.js';

test.describe('Login Tests', () => {
    const VALID_EMAIL = `rfigueroav@ucenfotec.ac.cr`;
    const VALID_PASSWORD = 'Raquel';
    let loginPage;
    let register;
    let context;
    let page;

    test.beforeAll(async () => {
        context = await BrowserManager.getContext();
        page = await context.newPage();
    });

    test.beforeEach(async () => {
        loginPage = Login.getInstanceLogin(page);
        register = Register.getInstanceRegister(page);
        await page.goto('https://tutorialsninja.com/demo/index.php?route=account/login');
        await page.waitForLoadState('networkidle');
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
        const successText = await loginPage.getSuccessPage();
        expect(successText).toContain('My Account');
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.login('invalid@example.com', 'invalidPassword');
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('No match for E-Mail Address and/or Password.');
    });

    test.afterEach(async ({}, testInfo) => {
        await context.clearCookies();
        if (testInfo.status !== testInfo.expectedStatus) {
            await captureScreenshot(page, testInfo.title);
            logError(`Test failed: ${testInfo.title}`);
        }
    });

    test.afterAll(async () => {
        await BrowserManager.closeAll();
    });
});
