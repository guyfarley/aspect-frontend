import { test, expect } from '@playwright/test';

test.describe('Campaign Loading', () => {
  test('only campaigns that current exist in database are displayed on initial get-install page load', async ({ page }) => {
    await page.goto('https://aspect-install-tracker.vercel.app/get-install');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);

    // create a locator
    const getStarted = page.getByRole('link', { name: 'Get started' });

    // Expect an attribute "to be strictly equal" to the value.
    await expect(getStarted).toHaveAttribute('href', '/docs/intro');

    // Click the get started link.
    await getStarted.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });
});
