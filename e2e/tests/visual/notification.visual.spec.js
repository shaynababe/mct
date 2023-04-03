/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
 * This test is dedicated to test notification banner functionality and its accessibility attributes.
 */

const { test, expect } = require('../../pluginFixtures');
const percySnapshot = require('@percy/playwright');
const { createDomainObjectWithDefaults } = require('../../appActions');

test.describe('Visual - Check Notification Info Banner of \'Save successful\'', () => {
    test.beforeEach(async ({ page }) => {
        // Go to baseURL and Hide Tree
        await page.goto('./', { waitUntil: 'networkidle' });
    });

    test('Create a clock, click on \'Save successful\' banner and dismiss it', async ({ page }) => {
        // Create a clock domain object
        await createDomainObjectWithDefaults(page, { type: 'Clock' });
        // Verify there is a button with aria-label="Review 1 Notification"
        expect(await page.locator('button[aria-label="Review 1 Notification"]').isVisible()).toBe(true);
        // Verify there is a button with aria-label="Clear all notifications"
        expect(await page.locator('button[aria-label="Clear all notifications"]').isVisible()).toBe(true);
        // Click on the div with role="alert" that has "Save successful" text
        await page.locator('div[role="alert"]:has-text("Save successful")').click();
        // Verify there is a div with role="dialog"
        expect(await page.locator('div[role="dialog"]').isVisible()).toBe(true);
        // Verify the div with role="dialog" contains text "Save successful"
        expect(await page.locator('div[role="dialog"]').innerText()).toContain('Save successful');
        await percySnapshot(page, 'Notification banner');
        // Verify there is a button with text "Dismiss"
        expect(await page.locator('button:has-text("Dismiss")').isVisible()).toBe(true);
        // Click on button with text "Dismiss"
        await page.locator('button:has-text("Dismiss")').click();
        // Verify there is no div with role="dialog"
        expect(await page.locator('div[role="dialog"]').isVisible()).toBe(false);
    });
});
