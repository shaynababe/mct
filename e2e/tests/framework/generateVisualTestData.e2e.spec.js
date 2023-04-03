/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
This test suite is dedicated to generating LocalStorage via Session Storage to be used
in some visual test suites like controlledClock.visual.spec.js. This suite should run to completion
and generate an artifact named ./e2e/test-data/VisualTestData_storage.json . This will run
on every Commit to ensure that this object still loads into tests correctly and will retain the
.e2e.spec.js suffix.

TODO: Provide additional validation of object properties as it grows.

*/

const { createDomainObjectWithDefaults } = require('../../appActions.js');
const { test, expect } = require('../../pluginFixtures.js');

test('Generate Visual Test Data @localStorage', async ({ page, context }) => {
    //Go to baseURL
    await page.goto('./', { waitUntil: 'networkidle' });
    const overlayPlot = await createDomainObjectWithDefaults(page, { type: 'Overlay Plot' });

    // click create button
    await page.locator('button:has-text("Create")').click();

    // add sine wave generator with defaults
    await page.locator('li[role="menuitem"]:has-text("Sine Wave Generator")').click();

    //Add a 5000 ms Delay
    await page.locator('[aria-label="Loading Delay \\(ms\\)"]').fill('5000');

    await Promise.all([
        page.waitForNavigation(),
        page.locator('button:has-text("OK")').click(),
        //Wait for Save Banner to appear
        page.waitForSelector('.c-message-banner__message')
    ]);

    // focus the overlay plot
    await page.goto(overlayPlot.url);

    await expect(page.locator('.l-browse-bar__object-name')).toContainText(overlayPlot.name);
    //Save localStorage for future test execution
    await context.storageState({ path: './e2e/test-data/VisualTestData_storage.json' });
});
