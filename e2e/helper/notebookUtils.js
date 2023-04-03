/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

const { createDomainObjectWithDefaults } = require('../appActions');

const NOTEBOOK_DROP_AREA = '.c-notebook__drag-area';

/**
 * @param {import('@playwright/test').Page} page
 */
async function enterTextEntry(page, text) {
    // Click .c-notebook__drag-area
    await page.locator(NOTEBOOK_DROP_AREA).click();

    // enter text
    await page.locator('[aria-label="Notebook Entry"].is-selected div.c-ne__text').fill(text);
    await commitEntry(page);
}

/**
 * @param {import('@playwright/test').Page} page
 */
async function dragAndDropEmbed(page, notebookObject) {
    // Create example telemetry object
    const swg = await createDomainObjectWithDefaults(page, {
        type: "Sine Wave Generator"
    });
    // Navigate to notebook
    await page.goto(notebookObject.url);
    // Expand the tree to reveal the notebook
    await page.click('button[title="Show selected item in tree"]');
    // Drag and drop the SWG into the notebook
    await page.dragAndDrop(`text=${swg.name}`, NOTEBOOK_DROP_AREA);
    await commitEntry(page);
}

/**
 * @private
 * @param {import('@playwright/test').Page} page
 */
async function commitEntry(page) {
    await page.locator('.c-ne__save-button > button').click();
}

// eslint-disable-next-line no-undef
module.exports = {
    enterTextEntry,
    dragAndDropEmbed
};
