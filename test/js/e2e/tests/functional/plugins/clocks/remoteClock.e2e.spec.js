/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


// FIXME: Remove this eslint exception once tests are implemented
// eslint-disable-next-line no-unused-vars
const { test, expect } = require('../../../../baseFixtures');

test.describe('Remote Clock', () => {
    // eslint-disable-next-line require-await
    test.fixme('blocks historical requests until first tick is received', async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/5221'
        });
        // addInitScript to with remote clock
        // Switch time conductor mode to 'remote clock'
        // Navigate to telemetry
        // Verify that the plot renders historical data within the correct bounds
        // Refresh the page
        // Verify again that the plot renders historical data within the correct bounds
    });
});
