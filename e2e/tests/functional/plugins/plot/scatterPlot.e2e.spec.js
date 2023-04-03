/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
* This test suite is dedicated to testing the Scatter Plot component.
*/

const { test, expect } = require('../../../../pluginFixtures');
const { createDomainObjectWithDefaults, selectInspectorTab } = require('../../../../appActions');
const uuid = require('uuid').v4;

test.describe('Scatter Plot', () => {
    let scatterPlot;

    test.beforeEach(async ({ page }) => {
        // Open a browser, navigate to the main page, and wait until all networkevents to resolve
        await page.goto('./', { waitUntil: 'networkidle' });

        // Create the Scatter Plot
        scatterPlot = await createDomainObjectWithDefaults(page, { type: 'Scatter Plot' });
    });

    test('Can add and remove telemetry sources', async ({ page }) => {
        const editButton = page.locator('button[title="Edit"]');
        const saveButton = page.locator('button[title="Save"]');

        // Create a sine wave generator within the scatter plot
        const swg1 = await createDomainObjectWithDefaults(page, {
            type: 'Sine Wave Generator',
            name: `swg-${uuid()}`,
            parent: scatterPlot.uuid
        });

        // Navigate to the scatter plot and verify that
        // the SWG appears in the elements pool
        await page.goto(scatterPlot.url);
        await editButton.click();
        await selectInspectorTab(page, 'Elements');
        await expect.soft(page.locator(`#inspector-elements-tree >> text=${swg1.name}`)).toBeVisible();
        await saveButton.click();
        await page.locator('li[title="Save and Finish Editing"]').click();

        // Create another sine wave generator within the scatter plot
        const swg2 = await createDomainObjectWithDefaults(page, {
            type: 'Sine Wave Generator',
            name: `swg-${uuid()}`,
            parent: scatterPlot.uuid
        });

        // Verify that the 'Replace telemetry source' modal appears and accept it
        await expect.soft(page.locator('text=This action will replace the current telemetry source. Do you want to continue?')).toBeVisible();
        await page.click('text=Ok');

        // Navigate to the scatter plot and verify that the new SWG
        // appears in the elements pool and the old one is gone
        await page.goto(scatterPlot.url);
        await editButton.click();

        // Click the "Elements" tab
        await selectInspectorTab(page, 'Elements');
        await expect.soft(page.locator(`#inspector-elements-tree >> text=${swg1.name}`)).toBeHidden();
        await expect.soft(page.locator(`#inspector-elements-tree >> text=${swg2.name}`)).toBeVisible();
        await saveButton.click();

        // Right click on the new SWG in the elements pool and delete it
        await page.locator(`#inspector-elements-tree >> text=${swg2.name}`).click({
            button: 'right'
        });
        await page.locator('li[title="Remove this object from its containing object."]').click();

        // Verify that the 'Remove object' confirmation modal appears and accept it
        await expect.soft(page.locator('text=Warning! This action will remove this object. Are you sure you want to continue?')).toBeVisible();
        await page.click('text=Ok');

        // Verify that the elements pool shows no elements
        await expect(page.locator('text="No contained elements"')).toBeVisible();
    });
});
