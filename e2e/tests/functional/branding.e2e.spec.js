/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
This test suite is dedicated to tests which verify branding related components.
*/

const { test, expect } = require('../../baseFixtures.js');

test.describe('Branding tests', () => {
    test('About Modal launches with basic branding properties', async ({ page }) => {
        // Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        // Click About button
        await page.click('.l-shell__app-logo');

        // Verify that the NASA Logo Appears
        await expect(page.locator('.c-about__image')).toBeVisible();

        // Modify the Build information in 'about' Modal
        const versionInformationLocator = page.locator('ul.t-info.l-info.s-info').first();
        await expect(versionInformationLocator).toBeEnabled();
        await expect.soft(versionInformationLocator).toContainText(/Version: \d/);
        await expect.soft(versionInformationLocator).toContainText(/Build Date: ((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun))/);
        await expect.soft(versionInformationLocator).toContainText(/Revision: \b[0-9a-f]{5,40}\b/);
        await expect.soft(versionInformationLocator).toContainText(/Branch: ./);
    });
    test('Verify Links in About Modal @2p', async ({ page }) => {
        // Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        // Click About button
        await page.click('.l-shell__app-logo');

        // Verify that clicking on the third party licenses information opens up another tab on licenses url
        const [page2] = await Promise.all([
            page.waitForEvent('popup'),
            page.locator('text=click here for third party licensing information').click()
        ]);
        await page2.waitForLoadState('networkidle'); //Avoids timing issues with juggler/firefox
        expect(page2.waitForURL('**/licenses**')).toBeTruthy();
    });
});
