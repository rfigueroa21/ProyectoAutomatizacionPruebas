import { Page } from '@playwright/test';

export class HomePage {
    static instance = null;
    
    constructor(page) {
        if (HomePage.instance) {
            // Update the page reference in existing instance
            HomePage.instance.page = page;
            return HomePage.instance;
        }
        
        this.page = page;
        
        // Navigation
        this.searchInput = this.page.locator('input[name="search"]');
        this.searchButton = this.page.locator('.btn-default');
        this.cartBlackButton = this.page.locator('#cart-total');
        this.wishListLink = this.page.locator('#wishlist-total');

        // Main navigation menu
        this.navDesktops = this.page.locator('a[href*="category&path=20"]');
        this.navLaptops = this.page.locator('a[href*="category&path=18"]');
        this.navComponents = this.page.locator('a[href*="category&path=25"]');
        this.navTablets = this.page.locator('a[href*="category&path=57"]');
        this.navSoftware = this.page.locator('a[href*="category&path=17"]');
        this.navPhones = this.page.locator('a[href*="category&path=24"]');
        this.navCameras = this.page.locator('a[href*="category&path=33"]');
        this.navMp3Players = this.page.locator('a[href*="category&path=34"]');

        // iPhone elements
        this.featuredSection = this.page.locator('.row .product-layout');
        this.iPhoneProductLink = this.page.locator('a[href*="product_id=40"]');
        this.featuredProductMainPrice = this.page.locator('p.price').locator('text=$123.20');
        this.iPhoneImageLink = this.page.locator('a[href*="product_id=40"]:has(img)');
        this.addToCartButton = this.page.locator('button[onclick*="cart.add(\'40\')"]');
        this.addToWishButton = this.page.locator('button[onclick*="wishlist.add(\'40\')"]');
        this.compareButton = this.page.locator('.btn-default[title="Compare this Product"]');

        // Carousel/Slideshow
        this.carouselContainer = this.page.locator('#slideshow0');
        this.carouselItems = this.page.locator('.item');
        this.carouselNextButton = this.page.locator('.carousel-control-next');
        this.carouselPrevButton = this.page.locator('.carousel-control-prev');

        // Cart
        this.cartTotal = this.page.locator('#cart .btn-inverse');
        this.emptyCartMessage = this.page.locator('.text-center');

        // Login elements (these seem out of place for a HomePage class)
        this.userInput = this.page.locator('input[data-test="username"]');
        this.passwordInput = this.page.locator('input[data-test="password"]');
        this.loginButton = this.page.locator('input[id="login-button"]');
        this.errorLoginFailed = this.page.locator('h3[data-test="error"]');

        HomePage.instance = this;
        return this;
    }

    static getInstance(page) {
        if (!HomePage.instance) {
            HomePage.instance = new HomePage(page);
        }
        return HomePage.instance;
    }
}

export default HomePage;