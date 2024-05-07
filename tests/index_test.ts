import { expect, test } from '@playwright/test';

const breakpoints = {
  small: 320,
  medium: 800,
  large: 1050,
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

// TODO: `matches-store` is not working as expected (only within tests for some reason) - need to investigate
test.skip('store of current matches functions as expected', async ({ page }) => {
  await page.goto('/');

  await page.setViewportSize({ width: breakpoints.small, height: 600 });

  await expect(page.locator('[data-test-id="matches-store"]')).toBeVisible();

  expect(
    await page.locator('[data-test-id="matches-store"]').textContent()
  ).toEqual('sm');

  await page.setViewportSize({ width: breakpoints.medium, height: 600 });

  expect(
    await page.locator('[data-test-id="matches-store"]').textContent()
  ).toEqual('sm, md');

  await page.setViewportSize({ width: breakpoints.large, height: 600 });

  expect(
    await page.locator('[data-test-id="matches-store"]').textContent()
  ).toEqual('sm, md, lg');
});
