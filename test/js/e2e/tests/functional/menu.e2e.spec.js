/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is dedicated to tests which verify persistability checks
*/

const { test, expect } = require('../../baseFixtures.js');

const path = require('path');

test.describe('Persistence operations @addInit', () => {
    // add non persistable root item
    test.beforeEach(async ({ page }) => {
        // eslint-disable-next-line no-undef
        await page.addInitScript({ path: path.join(__dirname, '../../helper', 'addNoneditableObject.js') });
    });

    test('Non-persistable objects should not show persistence related actions', async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });

        await page.locator('text=Persistence Testing').first().click({
            button: 'right'
        });

        const menuOptions = page.locator('.c-menu li');

        await expect.soft(menuOptions).toContainText(['Open In New Tab', 'View', 'Create Link']);
        await expect(menuOptions).not.toContainText(['Move', 'Duplicate', 'Remove', 'Add New Folder', 'Edit Properties...', 'Export as JSON', 'Import from JSON']);
    });
});
