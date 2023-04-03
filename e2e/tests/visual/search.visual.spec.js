/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is dedicated to tests which verify search functionality.
*/

const { test, expect } = require('../../pluginFixtures');
const { createDomainObjectWithDefaults } = require('../../appActions');

const percySnapshot = require('@percy/playwright');

test.describe('Grand Search', () => {
    test.beforeEach(async ({ page, theme }) => {
        //Go to baseURL and Hide Tree
        await page.goto('./#/browse/mine?hideTree=true', { waitUntil: 'networkidle' });
    });
    test.use({
        clockOptions: {
            now: 0, //Set browser clock to UNIX Epoch
            shouldAdvanceTime: false //Don't advance the clock
        }
    });
    //This needs to be rewritten to use a non clock or non display layout object
    test('Can search for objects, and subsequent search dropdown behaves properly @unstable', async ({ page, theme }) => {
        // await createDomainObjectWithDefaults(page, 'Display Layout');
        // await page.locator('text=Snapshot Save and Finish Editing Save and Continue Editing >> button').nth(1).click();
        // await page.locator('text=Save and Finish Editing').click();
        const folder1 = 'Folder1';
        await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: folder1
        });

        // Click [aria-label="OpenMCT Search"] input[type="search"]
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();
        // Fill [aria-label="OpenMCT Search"] input[type="search"]
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill(folder1);
        await expect(page.locator('[aria-label="Search Result"]')).toContainText(folder1);
        await percySnapshot(page, 'Searching for Folder Object');

        await page.locator('[aria-label="OpenMCT Search"] [aria-label="Search Input"]').click();
        await page.locator('[aria-label="Unnamed Clock clock result"] >> text=Unnamed Clock').click();
        await percySnapshot(page, 'Preview for clock should display when editing enabled and search item clicked');

        await page.locator('[aria-label="Close"]').click();
        await percySnapshot(page, 'Search should still be showing after preview closed');

        await page.locator('text=Snapshot Save and Finish Editing Save and Continue Editing >> button').nth(1).click();

        await page.locator('text=Save and Finish Editing').click();

        await page.locator('[aria-label="OpenMCT Search"] [aria-label="Search Input"]').click();

        await page.locator('[aria-label="OpenMCT Search"] [aria-label="Search Input"]').fill('Cl');

        await Promise.all([
            page.waitForNavigation(),
            page.locator('text=Unnamed Clock').click()
        ]);
        await percySnapshot(page, `Clicking on search results should navigate to them if not editing (theme: '${theme}')`);

    });
});

