import { test, expect } from '@playwright/test';

test('redirects root to /en', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveURL(/\/en/);
});

test('AR page has dir=rtl', async ({ page }) => {
  await page.goto('http://localhost:3000/ar');
  const dir = await page.getAttribute('html', 'dir');
  expect(dir).toBe('rtl');
});
