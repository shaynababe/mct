/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
Collection of Visual Tests set to run in a default context. The tests within this suite
are only meant to run against openmct started by `npm start` within the
`./e2e/playwright-visual.config.js` file.

*/

const { test, expect } = require('../../pluginFixtures');
const percySnapshot = require('@percy/playwright');

test.describe('Visual - Controlled Clock @localStorage', () => {
    test.use({
        storageState: './e2e/test-data/VisualTestData_storage.json',
        clockOptions: {
            now: 0, //Set browser clock to UNIX Epoch
            shouldAdvanceTime: false //Don't advance the clock
        }
    });

    test('Overlay Plot Loading Indicator @localStorage', async ({ page, theme }) => {
        // Go to baseURL
        await page.goto('./#/browse/mine?hideTree=true', { waitUntil: 'networkidle' });

        await page.locator('a:has-text("Unnamed Overlay Plot Overlay Plot")').click();
        //Ensure that we're on the Unnamed Overlay Plot object
        await expect(page.locator('.l-browse-bar__object-name')).toContainText('Unnamed Overlay Plot');

        //Wait for canvas to be rendered and stop animating
        await page.locator('canvas >> nth=1').hover({trial: true});

        //Take snapshot of Sine Wave Generator within Overlay Plot
        await percySnapshot(page, `SineWaveInOverlayPlot (theme: '${theme}')`);
    });
});
