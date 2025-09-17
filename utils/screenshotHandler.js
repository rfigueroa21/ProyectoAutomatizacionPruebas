// Screenshot handler for failed tests
export async function captureScreenshot(page, testName) {
    const filePath = `screenshots/${testName.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: filePath, fullPage: true });
    return filePath;
}
