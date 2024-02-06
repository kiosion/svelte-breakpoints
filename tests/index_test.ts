import { expect, test } from '@playwright/test';

const breakpoints = {
  small: 320,
  medium: 800,
  large: 1000,
  'extra large': 1400
};

test('index page breakpoints respond to viewport changes', async ({ page }) => {
  await page.goto('/');

  for (const [breakpointName, breakpointValue] of Object.entries(breakpoints)) {
    await page.setViewportSize({ width: breakpointValue, height: 600 });

    await expect(
      page.locator(`text=The current breakpoint is: ${breakpointName}`)
    ).toBeVisible();
  }
});
