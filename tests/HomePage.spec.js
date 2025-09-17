import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import BrowserManager from '../core/BrowserManager.js';
import { captureScreenshot } from '../utils/screenshotHandler.js';
import { logError } from '../utils/logger.js';

test.describe('Homepage Tests', () => {
    let homePage;
    let context;
    let page;

    test.beforeAll(async () => {
        context = await BrowserManager.getContext();
        page = await context.newPage();
        homePage = HomePage.getInstanceHomePage(page);
        await homePage.visit('https://tutorialsninja.com/demo/');
        await homePage.waitForPageLoad();
    });

    test.beforeEach(async () => {
        // Reload the page before each test for a clean state
        await homePage.visit('https://tutorialsninja.com/demo/');
        await homePage.waitForPageLoad();
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

    test('should open product page when iPhone link is clicked', async () => {
        await homePage.iPhoneProductLink.click();
        await expect(homePage.page).toHaveURL(/product_id=40/);
    });
    
    test('should search for Samsung and show results', async () => {
        await homePage.searchFor('Samsung');
        await expect(homePage.page).toHaveURL(/search/);
        //create locator on another page object
        await expect(homePage.page.locator('a:has-text("Samsung Galaxy Tab 10.1")')).toBeVisible();
    });

    test('should display correct price for Samsung SyncMaster 941BW', async () => {
        await homePage.searchFor('Samsung');
        await expect(homePage.page).toHaveURL(/search/);
        //move this to another page object
        const priceLocator = homePage.page.locator('a:has-text("Samsung SyncMaster 941BW")').locator('xpath=../../p[@class="price"]');
        await expect(priceLocator).toContainText('$242.00');
    });

    test('should add iPhone to wishlist', async () => {
        await homePage.addToWishlist();
        // Verify that the wishlist count has increased or a success message is shown
        await expect(homePage.wishListLink).toBeVisible();
    });

    test('should add iPhone to product comparison', async () => {
        await homePage.addToProductComparison();
        // Verify that the comparison count has increased or a success message is shown
        await expect(homePage.compareLink).toBeVisible();
    }); 

    test('should add Product to cart', async () => {
        await homePage.addToCartButton.click();
        // Verify that the cart count has increased or a success message is shown
        await expect(homePage.cartSuccessAlert).toBeVisible();
    });

    test('should remove item from cart', async () => {
        await homePage.addToCartButton.click();
        await homePage.cartBlackButton.click();
        await homePage.page.locator('button[title="Remove"]').click();
        await homePage.cartBlackButton.click(); // Re-open cart dropdown to refresh
        // Use a more specific locator for the empty cart message
        await homePage.cartBlackButton.click();
        await expect(homePage.emptyCartMessage).toHaveText('Your shopping cart is empty!');
    }); 
    
    test('should remove all items from cart', async () => {
        await homePage.addToCartButton.click({ multiple: true });
        await homePage.cartBlackButton.click(); // Open cart dropdown
        await homePage.page.locator('button[title="Remove"]').click({ multiple: true });
        await homePage.cartBlackButton.click(); // Re-open cart dropdown to refresh
        await expect(homePage.emptyCartMessage).toHaveText('Your shopping cart is empty!');
    });

    test('should navigate to all main categories from navigation menu', async () => {
        const categories = [
            { linkText: 'Desktops', url: /category&path=20/ },
            { linkText: 'Laptops & Notebooks', url: /category&path=18/ },
            { linkText: 'Components', url: /category&path=25/ },
            { linkText: 'Tablets', url: /category&path=57/ },
            { linkText: 'Software', url: /category&path=17/ },
            { linkText: 'Phones & PDAs', url: /category&path=24/ },
            { linkText: 'Cameras', url: /category&path=33/ },
            { linkText: 'MP3 Players', url: /category&path=34/ }
        ];
        for (const { linkText, url } of categories) {
            await homePage.visit('https://tutorialsninja.com/demo/');
            const mainMenuLink = homePage.page.locator('nav .navbar-nav > li > a:has-text("' + linkText + '")');
            await mainMenuLink.first().hover();
            // Check for submenu
            const submenu = mainMenuLink.locator('xpath=../ul/li/a');
            if (await submenu.count() > 0) {
                await submenu.first().isVisible()
                await submenu.first().click();
            } else {
                await mainMenuLink.first().click();
            }
            await homePage.waitForPageLoad();
            await expect(homePage.page).toHaveURL(url);
        }
    });


});
