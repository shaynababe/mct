/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is dedicated to tests which verify the basic operations surrounding Clock.
*/

const { test, expect } = require('../../../../baseFixtures');

test.describe('Clock Generator CRUD Operations', () => {

    test('Timezone dropdown will collapse when clicked outside or on dropdown icon again', async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/4878'
        });
        //Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        //Click the Create button
        await page.click('button:has-text("Create")');

        // Click Clock
        await page.click('text=Clock');

        // Click .icon-arrow-down
        await page.locator('.icon-arrow-down').click();
        //verify if the autocomplete dropdown is visible
        await expect(page.locator(".c-input--autocomplete__options")).toBeVisible();
        // Click .icon-arrow-down
        await page.locator('.icon-arrow-down').click();

        // Verify clicking on the autocomplete arrow collapses the dropdown
        await expect(page.locator(".c-input--autocomplete__options")).toBeHidden();

        // Click timezone input to open dropdown
        await page.locator('.c-input--autocomplete__input').click();
        //verify if the autocomplete dropdown is visible
        await expect(page.locator(".c-input--autocomplete__options")).toBeVisible();

        // Verify clicking outside the autocomplete dropdown collapses it
        await page.locator('text=Timezone').click();
        // Verify clicking on the autocomplete arrow collapses the dropdown
        await expect(page.locator(".c-input--autocomplete__options")).toBeHidden();

    });
});
