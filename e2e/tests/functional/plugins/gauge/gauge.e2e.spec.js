/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
* This test suite is dedicated to testing the Gauge component.
*/

const { test, expect } = require('../../../../pluginFixtures');
const { createDomainObjectWithDefaults } = require('../../../../appActions');
const uuid = require('uuid').v4;

test.describe('Gauge', () => {
    test.beforeEach(async ({ page }) => {
        // Open a browser, navigate to the main page, and wait until all networkevents to resolve
        await page.goto('./', { waitUntil: 'networkidle' });
    });

    test('Can add and remove telemetry sources @unstable', async ({ page }) => {
        // Create the gauge with defaults
        const gauge = await createDomainObjectWithDefaults(page, { type: 'Gauge' });
        const editButtonLocator = page.locator('button[title="Edit"]');
        const saveButtonLocator = page.locator('button[title="Save"]');

        // Create a sine wave generator within the gauge
        const swg1 = await createDomainObjectWithDefaults(page, {
            type: 'Sine Wave Generator',
            name: `swg-${uuid()}`,
            parent: gauge.uuid
        });

        // Navigate to the gauge and verify that
        // the SWG appears in the elements pool
        await page.goto(gauge.url);
        await editButtonLocator.click();
        await expect.soft(page.locator(`#inspector-elements-tree >> text=${swg1.name}`)).toBeVisible();
        await saveButtonLocator.click();
        await page.locator('li[title="Save and Finish Editing"]').click();

        // Create another sine wave generator within the gauge
        const swg2 = await createDomainObjectWithDefaults(page, {
            type: 'Sine Wave Generator',
            name: `swg-${uuid()}`,
            parent: gauge.uuid
        });

        // Verify that the 'Replace telemetry source' modal appears and accept it
        await expect.soft(page.locator('text=This action will replace the current telemetry source. Do you want to continue?')).toBeVisible();
        await page.click('text=Ok');

        // Navigate to the gauge and verify that the new SWG
        // appears in the elements pool and the old one is gone
        await page.goto(gauge.url);
        await editButtonLocator.click();
        await expect.soft(page.locator(`#inspector-elements-tree >> text=${swg1.name}`)).toBeHidden();
        await expect.soft(page.locator(`#inspector-elements-tree >> text=${swg2.name}`)).toBeVisible();
        await saveButtonLocator.click();

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
    test('Can create a non-default Gauge', async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/5356'
        });
        //Click the Create button
        await page.click('button:has-text("Create")');

        // Click the object specified by 'type'
        await page.click(`li[role='menuitem']:text("Gauge")`);
        // FIXME: We need better selectors for these custom form controls
        const displayCurrentValueSwitch = page.locator('.c-toggle-switch__slider >> nth=0');
        await displayCurrentValueSwitch.setChecked(false);
        await page.click('button[aria-label="Save"]');

        // TODO: Verify changes in the UI
    });
    test('Can edit a single Gauge-specific property', async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/5985'
        });

        // Create the gauge with defaults
        await createDomainObjectWithDefaults(page, { type: 'Gauge' });
        await page.click('button[title="More options"]');
        await page.click('li[role="menuitem"]:has-text("Edit Properties")');
        // FIXME: We need better selectors for these custom form controls
        const displayCurrentValueSwitch = page.locator('.c-toggle-switch__slider >> nth=0');
        await displayCurrentValueSwitch.setChecked(false);
        await page.click('button[aria-label="Save"]');

        // TODO: Verify changes in the UI
    });
});
