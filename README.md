# Playwright Test Automation Project

This project demonstrates best practices for UI test automation using Playwright and JavaScript.

## Structure
- `tests/` – Test specs
- `pages/` – Page Object Model classes
- `core/` – Singleton browser/context manager
- `utils/` – Logging, screenshot, and network helpers
- `config/` – Playwright config and environment setup

## Features
- Modular architecture for maintainability
- Page Object Model (POM) for UI interactions
- Singleton pattern for browser/context management
- Automatic evidence capture (screenshots, logs) on test failure
- Setup/teardown hooks for clean test runs

## Getting Started
1. Install dependencies:
   ```bash
   npm install @playwright/test
   ```
2. Run tests:
   ```bash
   npx playwright test
   ```

## Customization
- Add more page objects in `pages/`
- Add more tests in `tests/`
- Extend utilities in `utils/`
- Update config in `config/playwright.config.js`

---
For more details, see the code comments in each file.
