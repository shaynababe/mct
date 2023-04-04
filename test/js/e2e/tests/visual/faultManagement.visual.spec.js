/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const path = require('path');
const { test } = require('../../pluginFixtures');
const percySnapshot = require('@percy/playwright');

const utils = require('../../helper/faultUtils');

test.describe('The Fault Management Plugin Visual Test', () => {

    test('icon test', async ({ page, theme }) => {
        // eslint-disable-next-line no-undef
        await page.addInitScript({ path: path.join(__dirname, '../../helper/', 'addInitFaultManagementPlugin.js') });
        await page.goto('./', { waitUntil: 'networkidle' });

        await percySnapshot(page, `Fault Management icon appears in tree (theme: '${theme}')`);
    });

    test('fault list and acknowledged faults', async ({ page, theme }) => {
        await utils.navigateToFaultManagementWithStaticExample(page);

        await percySnapshot(page, `Shows a list of faults in the standard view (theme: '${theme}')`);

        await utils.acknowledgeFault(page, 1);
        await utils.changeViewTo(page, 'acknowledged');

        await percySnapshot(page, `Acknowledged faults, have a checkmark on the fault icon and appear in the acknowldeged view (theme: '${theme}')`);
    });

    test('shelved faults', async ({ page, theme }) => {
        await utils.navigateToFaultManagementWithStaticExample(page);

        await utils.shelveFault(page, 1);
        await utils.changeViewTo(page, 'shelved');

        await percySnapshot(page, `Shelved faults appear in the shelved view (theme: '${theme}')`);

        await utils.openFaultRowMenu(page, 1);

        await percySnapshot(page, `Shelved faults have a 3-dot menu with Unshelve option enabled (theme: '${theme}')`);
    });

    test('3-dot menu for fault', async ({ page, theme }) => {
        await utils.navigateToFaultManagementWithStaticExample(page);

        await utils.openFaultRowMenu(page, 1);

        await percySnapshot(page, `Faults have a 3-dot menu with Acknowledge, Shelve and Unshelve (Unshelve is disabled) options (theme: '${theme}')`);
    });

    test('ability to acknowledge or shelve', async ({ page, theme }) => {
        await utils.navigateToFaultManagementWithStaticExample(page);

        await utils.selectFaultItem(page, 1);

        await percySnapshot(page, `Selected faults highlight the ability to Acknowledge or Shelve above the fault list (theme: '${theme}')`);
    });
});
