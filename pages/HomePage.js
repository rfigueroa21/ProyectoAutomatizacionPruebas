import { Page } from '@playwright/test';

export class HomePage {
    static instance = null;
    
    constructor(page) {
        this.page = page;
        this.initializeLocators();        
        
        HomePage.instance = this;
        return this;
    }

    static getInstanceHomePage(page) {
        if (!HomePage.instance) {
            HomePage.instance = new HomePage(page);
        }
        return HomePage.instance;s
    }


    // Initialize all locators
    initializeLocators() {
        // Navigation
        this.searchInput = this.page.locator('input[name="search"]');
        this.searchButton = this.page.locator('.btn-default');
        this.cartBlackButton = this.page.locator('#cart-total');
        this.wishListLink = this.page.locator('#wishlist-total');
        this.compareLink = this.page.locator('.alert.alert-success');
        this.cartSuccessAlert = this.page.locator('.alert.alert-success:has-text("Success: You have added")');

        // Main navigation menu
        this.navDesktops = this.page.locator('a.dropdown-toggle', { hasText: 'Desktops' });
        this.navLaptops = this.page.locator('a.dropdown-toggle', { hasText: 'Laptops' });
        this.navComponents = this.page.locator('a.dropdown-toggle', { hasText: 'Components' });
        this.navTablets = this.page.locator('a.dropdown-toggle', { hasText: 'Tablets' });
        this.navSoftware = this.page.locator('a.dropdown-toggle', { hasText: 'Software' });
        this.navPhones = this.page.locator('a.dropdown-toggle', { hasText: 'Phones' });
        this.navCameras = this.page.locator('a.dropdown-toggle', { hasText: 'Cameras' });
        this.navMp3Players = this.page.locator('a.dropdown-toggle', { hasText: 'MP3 Players' });

        //Desktops navigation
        this.navPC = this.page.locator('a[href*="category&path=20_26"]');
        this.navMac = this.page.locator('a[href*="category&path=20_27"]');

        // Laptops & Notebooks navigation
        this.navMacs = this.page.locator('a[href*="category&path=18_46"]');
        this.navWindows = this.page.locator('a[href*="category&path=18_47"]');

        //Components navigation
        this.navMiceAndTrackballs = this.page.locator('a[href*="category&path=25_43"]');
        this.navMonitors = this.page.locator('a[href*="category&path=25_44"]');
        this.navPrinters = this.page.locator('a[href*="category&path=25_45"]'); 

        // Components navigation
        this.navMiceAndTrackballs = this.page.locator('a[href*="category&path=25_43"]');
        this.navMonitors = this.page.locator('a[href*="category&path=25_44"]');
        this.navPrinters = this.page.locator('a[href*="category&path=25_45"]');
        this.navScanners = this.page.locator('a[href*="category&path=25_48"]'); 
        this.navWebCams = this.page.locator('a[href*="category&path=25_49"]');  

        // MP3 Players navigation
        this.test11 = this.page.locator('a[href*="category&path=34_50"]'); // Test 11
        this.test12 = this.page.locator('a[href*="category&path=34_51"]'); // Test 12
        this.test13 = this.page.locator('a[href*="category&path=34_52"]'); // Test 13
        this.test14 = this.page.locator('a[href*="category&path=34_53"]'); // Test 14


        // iPhone elements
        this.featuredSection = this.page.locator('.row .product-layout');
        this.iPhoneProductLink = this.page.locator('a[href*="product_id=40"]:has-text("iPhone")');
        this.iPhoneProductImageLink = this.page.locator('a[href*="product_id=40"]:has(img)');
        this.featuredProductMainPrice = this.page.locator('p.price').locator('text=$123.20');
        this.addToCartButton = this.page.locator('button[onclick*="cart.add(\'40\')"]');
        this.addToWishButton = this.page.locator('button[onclick*="wishlist.add(\'40\')"]');
        this.compareButton = this.page.locator('button[onclick*="compare.add(\'40\')"]');

        // Carousel/Slideshow
        this.carouselContainer = this.page.locator('#slideshow0');
        this.carouselItems = this.page.locator('.item');
        this.carouselNextButton = this.page.locator('.carousel-control-next');
        this.carouselPrevButton = this.page.locator('.carousel-control-prev');

        // Cart
        this.cartTotal = this.page.locator('#cart .btn-inverse');
        this.emptyCartMessage = this.page.locator('#cart .dropdown-menu li p.text-center');

        // Login elements (these seem out of place for a HomePage class)
        this.userInput = this.page.locator('input[data-test="username"]');
        this.passwordInput = this.page.locator('input[data-test="password"]');
        this.loginButton = this.page.locator('input[id="login-button"]');
        this.errorLoginFailed = this.page.locator('h3[data-test="error"]');
    }

    

    // Navigation method to visit the home page
    async visit(url = 'https://tutorialsninja.com/demo/') {
        await this.page.goto(url);
        return this;
    }

    // Wait for page to be loaded
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
        return this;
    }

    async openProductPage() {
        await this.iPhoneProductLink.click();
    }
 
    async searchFor(text) {
        await this.searchInput.fill(text);
        await this.searchButton.click();
    }

    async addToWishlist() {
        await this.addToWishButton.click();
    }

    async addToProductComparison() {
        await this.compareButton.click();
    }   

    async verifySuccessMessageComparison(expectedMessage) {
        const alertText = await this.successAlert.textContent();
        return alertText.includes(expectedMessage);
    }
}

export default HomePage;