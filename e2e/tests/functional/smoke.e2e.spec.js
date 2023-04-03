/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
This test suite is dedicated to tests which can quickly verify that any openmct installation is
operable and that any type of testing can proceed.

Ideally, smoke tests should make zero assumptions about how and where they are run. This makes them
more resilient to change and therefor a better indicator of failure. Smoke tests will also run quickly
as they cover a very "thin surface" of functionality.

When deciding between authoring new smoke tests or functional tests, ask yourself "would I feel
comfortable running this test during a live mission?" Avoid creating or deleting Domain Objects.
Make no assumptions about the order that elements appear in the DOM.
*/

const { test, expect } = require('../../pluginFixtures');

test('Verify that the create button appears and that the Folder Domain Object is available for selection', async ({ page }) => {

    //Go to baseURL
    await page.goto('./', { waitUntil: 'networkidle' });

    //Click the Create button
    await page.click('button:has-text("Create")');

    // Verify that Create Folder appears in the dropdown
    await expect(page.locator(':nth-match(:text("Folder"), 2)')).toBeEnabled();
});

test('Verify that My Items Tree appears @ipad', async ({ page, openmctConfig }) => {
    const { myItemsFolderName } = openmctConfig;
    //Test.slow annotation is currently broken. Needs to be fixed in https://github.com/nasa/openmct/issues/5374
    test.slow();
    //Go to baseURL
    await page.goto('./');

    //My Items to be visible
    await expect(page.locator(`a:has-text("${myItemsFolderName}")`)).toBeEnabled();
});
