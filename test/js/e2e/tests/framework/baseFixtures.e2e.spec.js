/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is dedicated to testing our use of the playwright framework as it
relates to how we've extended it (i.e. ./e2e/baseFixtures.js) and assumptions made in our dev environment
(`npm start` and ./e2e/webpack-dev-middleware.js)
*/

const { test } = require('../../baseFixtures.js');

test.describe('baseFixtures tests', () => {
    test('Verify that tests fail if console.error is thrown', async ({ page }) => {
        test.fail();
        //Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        //Verify that ../fixtures.js detects console log errors
        await Promise.all([
            page.evaluate(() => console.error('This should result in a failure')),
            page.waitForEvent('console') // always wait for the event to happen while triggering it!
        ]);

    });
    test('Verify that tests pass if console.warn is thrown', async ({ page }) => {
        //Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        //Verify that ../fixtures.js detects console log errors
        await Promise.all([
            page.evaluate(() => console.warn('This should result in a pass')),
            page.waitForEvent('console') // always wait for the event to happen while triggering it!
        ]);

    });
});
