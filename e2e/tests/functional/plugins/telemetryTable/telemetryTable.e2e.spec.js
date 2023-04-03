/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

const { createDomainObjectWithDefaults } = require('../../../../appActions');
const { test, expect } = require('../../../../pluginFixtures');

test.describe('Telemetry Table', () => {
    test('unpauses and filters data when paused by button and user changes bounds', async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/5113'
        });

        await page.goto('./', { waitUntil: 'networkidle' });

        const table = await createDomainObjectWithDefaults(page, { type: 'Telemetry Table' });
        await createDomainObjectWithDefaults(page, {
            type: 'Sine Wave Generator',
            parent: table.uuid
        });

        // focus the Telemetry Table
        page.goto(table.url);

        // Click pause button
        const pauseButton = page.locator('button.c-button.icon-pause');
        await pauseButton.click();

        const tableWrapper = page.locator('div.c-table-wrapper');
        await expect(tableWrapper).toHaveClass(/is-paused/);

        // Subtract 5 minutes from the current end bound datetime and set it
        const endTimeInput = page.locator('input[type="text"].c-input--datetime').nth(1);
        await endTimeInput.click();

        let endDate = await endTimeInput.inputValue();
        endDate = new Date(endDate);

        endDate.setUTCMinutes(endDate.getUTCMinutes() - 5);
        endDate = endDate.toISOString().replace(/T/, ' ');

        await endTimeInput.fill('');
        await endTimeInput.fill(endDate);
        await page.keyboard.press('Enter');

        await expect(tableWrapper).not.toHaveClass(/is-paused/);

        // Get the most recent telemetry date
        const latestTelemetryDate = await page.locator('table.c-telemetry-table__body > tbody > tr').last().locator('td').nth(1).getAttribute('title');

        // Verify that it is <= our new end bound
        const latestMilliseconds = Date.parse(latestTelemetryDate);
        const endBoundMilliseconds = Date.parse(endDate);
        expect(latestMilliseconds).toBeLessThanOrEqual(endBoundMilliseconds);
    });
});
