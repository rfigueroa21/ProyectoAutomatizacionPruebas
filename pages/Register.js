import {Page} from '@playwright/test';

export class Register {
    static instance = null;

    constructor(page) {
        this.page = page;
        this.initializeLocators();

        Register.instance = this;
        return this;
    }

    static getInstanceRegister(page) {
        if (!Register.instance) {
            Register.instance = new Register(page);
        }
        return Register.instance;
    }

    // Initialize all locators
    initializeLocators() {
        // Registration form elements
        this.firstNameInput = this.page.locator('input[name="firstname"]');
        this.lastNameInput = this.page.locator('input[name="lastname"]');
        this.emailInput = this.page.locator('input[name="email"]');
        this.telephoneInput = this.page.locator('input[name="telephone"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.confirmPasswordInput = this.page.locator('input[name="confirm"]');
        this.privacyPolicyCheckbox = this.page.locator('input[name="agree"]');
        this.continueButton = this.page.locator('input[value="Continue"]');
        this.successMessage = this.page.locator('#content h1');
        this.errorMessage = this.page.locator('.alert-danger');
    }

    // Method to fill the registration form
    async fillRegistrationForm({ firstName, lastName, email, telephone, password }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.privacyPolicyCheckbox.check();
    }

    // Method to submit the registration form
    async submitRegistration() {
        await this.continueButton.click();
    }

    // Method to get the success message text
    async getSuccessMessage(text) {
        return await this.successMessage.textContent();
    }

    // Method to get the failure message text
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

export default Register;    