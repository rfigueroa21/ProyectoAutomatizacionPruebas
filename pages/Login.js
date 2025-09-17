import  {page}  from '@playwright/test';

export class Login {
    static instance = null;
    
    constructor(page) {
        this.page = page;
        this.initializeLocators();

        Login.instance = this;
        return this;
    }

    static getInstanceLogin(page) {
        if (!Login.instance) {
            Login.instance = new Login(page);
        }
        return Login.instance;
    }

    // Initialize all locators
    initializeLocators() {
        this.emailInput = this.page.locator('input[name="email"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('input[value="Login"]');
        this.forgottenPasswordLink = this.page.locator('a:has-text("Forgotten Password")');
        this.accountLogoutLink = this.page.locator('a:has-text("Logout")');
        this.accountLink = this.page.locator('a:has-text("My Account")');
        this.myAccountTitle = this.page.locator('#content h2:has-text("My Account")');
        this.errorMessage = this.page.locator('.alert-danger');
    }

    // Method to perform login
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Method to get the success message text
    async getSuccessPage() {
        return await this.myAccountTitle.textContent();
    }

    // Method to get the failure message text
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

export default Login;       