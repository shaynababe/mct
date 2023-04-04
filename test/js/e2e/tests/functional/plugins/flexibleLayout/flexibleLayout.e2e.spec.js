/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const { test, expect } = require('../../../../pluginFixtures');
const { createDomainObjectWithDefaults } = require('../../../../appActions');

test.describe('Flexible Layout', () => {
    let sineWaveObject;
    let clockObject;
    test.beforeEach(async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });

        // Create Sine Wave Generator
        sineWaveObject = await createDomainObjectWithDefaults(page, {
            type: 'Sine Wave Generator'
        });

        // Create Clock Object
        clockObject = await createDomainObjectWithDefaults(page, {
            type: 'Clock'
        });
    });
    test('panes have the appropriate draggable attribute while in Edit and Browse modes', async ({ page }) => {
        const treePane = page.getByRole('tree', {
            name: 'Main Tree'
        });
        const sineWaveGeneratorTreeItem = treePane.getByRole('treeitem', {
            name: new RegExp(sineWaveObject.name)
        });
        const clockTreeItem = treePane.getByRole('treeitem', {
            name: new RegExp(clockObject.name)
        });
        // Create a Flexible Layout
        await createDomainObjectWithDefaults(page, {
            type: 'Flexible Layout'
        });
        // Edit Flexible Layout
        await page.locator('[title="Edit"]').click();

        // Expand the 'My Items' folder in the left tree
        await page.locator('.c-tree__item__view-control.c-disclosure-triangle').first().click();
        // Add the Sine Wave Generator and Clock to the Flexible Layout
        await sineWaveGeneratorTreeItem.dragTo(page.locator('.c-fl__container.is-empty').first());
        await clockTreeItem.dragTo(page.locator('.c-fl__container.is-empty'));
        // Check that panes can be dragged while Flexible Layout is in Edit mode
        let dragWrapper = page.locator('.c-fl-container__frames-holder .c-fl-frame__drag-wrapper').first();
        await expect(dragWrapper).toHaveAttribute('draggable', 'true');
        // Save Flexible Layout
        await page.locator('button[title="Save"]').click();
        await page.locator('text=Save and Finish Editing').click();
        // Check that panes are not draggable while Flexible Layout is in Browse mode
        dragWrapper = page.locator('.c-fl-container__frames-holder .c-fl-frame__drag-wrapper').first();
        await expect(dragWrapper).toHaveAttribute('draggable', 'false');
    });
    test('items in a flexible layout can be removed with object tree context menu when viewing the flexible layout', async ({ page }) => {
        const treePane = page.getByRole('tree', {
            name: 'Main Tree'
        });
        const sineWaveGeneratorTreeItem = treePane.getByRole('treeitem', {
            name: new RegExp(sineWaveObject.name)
        });
        // Create a Display Layout
        await createDomainObjectWithDefaults(page, {
            type: 'Flexible Layout'
        });
        // Edit Flexible Layout
        await page.locator('[title="Edit"]').click();

        // Expand the 'My Items' folder in the left tree
        await page.locator('.c-tree__item__view-control.c-disclosure-triangle').first().click();
        // Add the Sine Wave Generator to the Flexible Layout and save changes
        await sineWaveGeneratorTreeItem.dragTo(page.locator('.c-fl__container.is-empty').first());
        await page.locator('button[title="Save"]').click();
        await page.locator('text=Save and Finish Editing').click();

        expect.soft(await page.locator('.c-fl-container__frame').count()).toEqual(1);

        // Expand the Flexible Layout so we can remove the sine wave generator
        await page.locator('.c-tree__item.is-navigated-object .c-disclosure-triangle').click();

        // Bring up context menu and remove
        await sineWaveGeneratorTreeItem.first().click({ button: 'right' });
        await page.locator('li[role="menuitem"]:has-text("Remove")').click();
        await page.locator('button:has-text("OK")').click();

        // Verify that the item has been removed from the layout
        expect(await page.locator('.c-fl-container__frame').count()).toEqual(0);
    });
    test('items in a flexible layout can be removed with object tree context menu when viewing another item', async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/3117'
        });
        const treePane = page.getByRole('tree', {
            name: 'Main Tree'
        });
        const sineWaveGeneratorTreeItem = treePane.getByRole('treeitem', {
            name: new RegExp(sineWaveObject.name)
        });

        // Create a Flexible Layout
        const flexibleLayout = await createDomainObjectWithDefaults(page, {
            type: 'Flexible Layout'
        });
        // Edit Flexible Layout
        await page.locator('[title="Edit"]').click();

        // Expand the 'My Items' folder in the left tree
        await page.locator('.c-tree__item__view-control.c-disclosure-triangle').click();
        // Add the Sine Wave Generator to the Flexible Layout and save changes
        await sineWaveGeneratorTreeItem.dragTo(page.locator('.c-fl__container.is-empty').first());
        await page.locator('button[title="Save"]').click();
        await page.locator('text=Save and Finish Editing').click();

        expect.soft(await page.locator('.c-fl-container__frame').count()).toEqual(1);

        // Expand the Flexible Layout so we can remove the sine wave generator
        await page.locator('.c-tree__item.is-navigated-object .c-disclosure-triangle').click();

        // Go to the original Sine Wave Generator to navigate away from the Flexible Layout
        await page.goto(sineWaveObject.url);

        // Bring up context menu and remove
        await sineWaveGeneratorTreeItem.first().click({ button: 'right' });
        await page.locator('li[role="menuitem"]:has-text("Remove")').click();
        await page.locator('button:has-text("OK")').click();

        // navigate back to the display layout to confirm it has been removed
        await page.goto(flexibleLayout.url);

        // Verify that the item has been removed from the layout
        expect(await page.locator('.c-fl-container__frame').count()).toEqual(0);
    });
});
