import { test, expect } from '@playwright/test';
import Register from '../pages/Register.js';
import BrowserManager from '../core/BrowserManager.js';
import { captureScreenshot } from '../utils/screenshotHandler.js';
import { logError } from '../utils/logger.js';

test.describe('User Registration Tests', () => {
    let registerPage;
    let context;
    let page;

    test.beforeAll(async () => {
        context = await BrowserManager.getContext();
        page = await context.newPage();
        registerPage = Register.getInstanceRegister(page);
        await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
        await page.waitForLoadState('networkidle');
    });

    test.beforeEach(async () => {
        // Reload the registration page before each test for a clean state
        await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
        await page.waitForLoadState('networkidle');
    });

    test.afterEach(async ({}, testInfo) => {
        await context.clearCookies();
        if (testInfo.status !== testInfo.expectedStatus) {
            await captureScreenshot(page, testInfo.title);
            logError(`Test failed: ${testInfo.title}`);
        }
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('should register a new user successfully', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: `john.doe${Date.now()}@example.com`, 
            telephone: '1234567890',
            password: 'Password123'
        };

        await registerPage.fillRegistrationForm(userData);
        await registerPage.submitRegistration();

        const successMessage = 'Your Account Has Been Created!';
        expect(await registerPage.getSuccessMessage()).toBe(successMessage);
    });

    test('should show error when required fields are missing', async () => {
        await registerPage.submitRegistration();
        const errorText = 'Warning: You must agree to the Privacy Policy!';
        expect(await registerPage.getErrorMessage()).toContain(errorText);
    });
});
