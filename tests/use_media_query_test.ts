import { expect, test } from '@playwright/test';

test('useMediaQuery reacts to MQL changes', async ({ page }) => {
  await page.goto('/useMediaQuery');

  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(
    page.locator('text=The current color scheme is: dark')
  ).toBeVisible();

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(
    page.locator('text=The current color scheme is: light')
  ).toBeVisible();
});
