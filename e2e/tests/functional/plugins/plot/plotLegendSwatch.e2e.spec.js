/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
Tests to verify log plot functionality. Note this test suite if very much under active development and should not
necessarily be used for reference when writing new tests in this area.
*/

const { selectInspectorTab } = require('../../../../appActions');
const { test, expect } = require('../../../../pluginFixtures');

test.describe('Legend color in sync with plot color', () => {
    test('Testing', async ({ page }) => {
        await makeOverlayPlot(page);

        // navigate to plot series color palette
        await page.click('.l-browse-bar__actions__edit');
        await selectInspectorTab(page, 'Config');

        await page.locator('li.c-tree__item.menus-to-left .c-disclosure-triangle').click();
        await page.locator('.c-click-swatch--menu').click();
        await page.locator('.c-palette__item[style="background: rgb(255, 166, 61);"]').click();

        // gets color for swatch located in legend
        const element = await page.waitForSelector('.plot-series-color-swatch');
        const color = await element.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('background-color');
        });

        expect(color).toBe('rgb(255, 166, 61)');
    });
});

async function saveOverlayPlot(page) {
    // save overlay plot
    await page.locator('text=Snapshot Save and Finish Editing Save and Continue Editing >> button').nth(1).click();

    await Promise.all([
        page.locator('text=Save and Finish Editing').click(),
        //Wait for Save Banner to appear
        page.waitForSelector('.c-message-banner__message')
    ]);
    //Wait until Save Banner is gone
    await page.locator('.c-message-banner__close-button').click();
    await page.waitForSelector('.c-message-banner__message', { state: 'detached' });
}

async function makeOverlayPlot(page) {
    // fresh page with time range from 2022-03-29 22:00:00.000Z to 2022-03-29 22:00:30.000Z
    await page.goto('/', { waitUntil: 'networkidle' });

    // create overlay plot

    await page.locator('button.c-create-button').click();
    await page.locator('li[role="menuitem"]:has-text("Overlay Plot")').click();
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle'}),
        page.locator('button:has-text("OK")').click(),
        //Wait for Save Banner to appear
        page.waitForSelector('.c-message-banner__message')
    ]);
    //Wait until Save Banner is gone
    await page.locator('.c-message-banner__close-button').click();
    await page.waitForSelector('.c-message-banner__message', { state: 'detached'});

    // save the overlay plot

    await saveOverlayPlot(page);

    // create a sinewave generator

    await page.locator('button.c-create-button').click();
    await page.locator('li[role="menuitem"]:has-text("Sine Wave Generator")').click();

    // Click OK to make generator

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle'}),
        page.locator('button:has-text("OK")').click(),
        //Wait for Save Banner to appear
        page.waitForSelector('.c-message-banner__message')
    ]);
    //Wait until Save Banner is gone
    await page.locator('.c-message-banner__close-button').click();
    await page.waitForSelector('.c-message-banner__message', { state: 'detached'});

    // click on overlay plot

    await page.locator('text=Open MCT My Items >> span').nth(3).click();
    await Promise.all([
        page.waitForNavigation(),
        page.locator('text=Unnamed Overlay Plot').first().click()
    ]);
}
