/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
* This test suite template is to be used when verifying Test Data files found in /e2e/test-data/
*/

const { test } = require('../../baseFixtures');

test.describe('recycled_local_storage @localStorage', () => {
    //We may want to do some additional level of verification of this file. For now, we just verify that it exists and can be used in a test suite.
    test.use({ storageState: './e2e/test-data/recycled_local_storage.json' });
    test('Can use recycled_local_storage file', async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
    });
});

