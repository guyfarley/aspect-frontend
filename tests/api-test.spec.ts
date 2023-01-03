import { test, expect } from '@playwright/test';
import { request } from 'http';

let location;

test.describe('Data Retrieval', () => {
  test('Data successfully pulled from database', async ({ request, baseURL }) => {

    // Expect response to be ok
    const response = await request.get(`${baseURL}`);
    console.log(await response.json());

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const res = await response.json();
    location = res.location;
    console.log('test location: ', location);

    expect(location).toBe('Denver, CO');
    // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);

    // create a locator
    // const getStarted = page.getByRole('link', { name: 'Get started' });

    // Expect an attribute "to be strictly equal" to the value.
    // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

    // Click the get started link.
    // await getStarted.click();

    // Expects the URL to contain intro.
    // await expect(page).toHaveURL(/.*intro/);
  });
});
