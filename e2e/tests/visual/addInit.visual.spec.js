/* eslint-disable no-undef */
/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
Collection of Visual Tests set to run with modified init scripts to inject plugins not otherwise available in the default contexts.

These should only use functional expect statements to verify assumptions about the state
in a test and not for functional verification of correctness. Visual tests are not supposed
to "fail" on assertions. Instead, they should be used to detect changes between builds or branches.

Note: Larger testsuite sizes are OK due to the setup time associated with these tests.
*/

// eslint-disable-next-line no-unused-vars
const { test, expect } = require('../../pluginFixtures');
const { createDomainObjectWithDefaults } = require('../../appActions');
const percySnapshot = require('@percy/playwright');
const path = require('path');

const CUSTOM_NAME = 'CUSTOM_NAME';

test.describe('Visual - addInit', () => {
    test.use({
        clockOptions: {
            now: 0, //Set browser clock to UNIX Epoch
            shouldAdvanceTime: false //Don't advance the clock
        }
    });

    test('Restricted Notebook is visually correct @addInit @unstable', async ({ page, theme }) => {
        // eslint-disable-next-line no-undef
        await page.addInitScript({ path: path.join(__dirname, '../../helper', './addInitRestrictedNotebook.js') });
        //Go to baseURL
        await page.goto('./#/browse/mine?hideTree=true', { waitUntil: 'networkidle' });

        await createDomainObjectWithDefaults(page, { type: CUSTOM_NAME });

        // Take a snapshot of the newly created CUSTOM_NAME notebook
        await percySnapshot(page, `Restricted Notebook with CUSTOM_NAME (theme: '${theme}')`);

    });
});
