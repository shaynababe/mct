/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is dedicated to tests which verify form functionality.
*/

const { test, expect } = require('../../../../pluginFixtures');
const { createDomainObjectWithDefaults, selectInspectorTab } = require('../../../../appActions');
const nbUtils = require('../../../../helper/notebookUtils');

/**
  * Creates a notebook object and adds an entry.
  * @param {import('@playwright/test').Page} - page to load
  * @param {number} [iterations = 1] - the number of entries to create
  */
async function createNotebookAndEntry(page, iterations = 1) {
    //Go to baseURL
    await page.goto('./', { waitUntil: 'networkidle' });

    const notebook = createDomainObjectWithDefaults(page, { type: 'Notebook' });

    for (let iteration = 0; iteration < iterations; iteration++) {
        await nbUtils.enterTextEntry(page, `Entry ${iteration}`);
    }

    return notebook;
}

/**
  * Creates a notebook object, adds an entry, and adds a tag.
  * @param {import('@playwright/test').Page} page
  * @param {number} [iterations = 1] - the number of entries (and tags) to create
  */
async function createNotebookEntryAndTags(page, iterations = 1) {
    const notebook = await createNotebookAndEntry(page, iterations);
    await selectInspectorTab(page, 'Annotations');

    for (let iteration = 0; iteration < iterations; iteration++) {
        // Hover and click "Add Tag" button
        // Hover is needed here to "slow down" the actions while running in headless mode
        await page.locator(`[aria-label="Notebook Entry"] >> nth = ${iteration}`).click();
        await page.hover(`button:has-text("Add Tag")`);
        await page.locator(`button:has-text("Add Tag")`).click();

        // Click inside the tag search input
        await page.locator('[placeholder="Type to select tag"]').click();
        // Select the "Driving" tag
        await page.locator('[aria-label="Autocomplete Options"] >> text=Driving').click();

        // Hover and click "Add Tag" button
        // Hover is needed here to "slow down" the actions while running in headless mode
        await page.hover(`button:has-text("Add Tag")`);
        await page.locator(`button:has-text("Add Tag")`).click();
        // Click inside the tag search input
        await page.locator('[placeholder="Type to select tag"]').click();
        // Select the "Science" tag
        await page.locator('[aria-label="Autocomplete Options"] >> text=Science').click();
    }

    return notebook;
}

test.describe('Tagging in Notebooks @addInit', () => {
    test('Can load tags', async ({ page }) => {
        await createNotebookAndEntry(page);

        // TODO can be removed with fix for https://github.com/nasa/openmct/issues/6411
        await page.locator('[aria-label="Notebook Entry"].is-selected div.c-ne__text').click();

        await selectInspectorTab(page, 'Annotations');

        await page.locator('button:has-text("Add Tag")').click();

        await page.locator('[placeholder="Type to select tag"]').click();

        await expect(page.locator('[aria-label="Autocomplete Options"]')).toContainText("Science");
        await expect(page.locator('[aria-label="Autocomplete Options"]')).toContainText("Drilling");
        await expect(page.locator('[aria-label="Autocomplete Options"]')).toContainText("Driving");
    });
    test('Can add tags', async ({ page }) => {
        await createNotebookEntryAndTags(page);

        await expect(page.locator('[aria-label="Notebook Entry"]')).toContainText("Science");
        await expect(page.locator('[aria-label="Notebook Entry"]')).toContainText("Driving");

        await page.locator('button:has-text("Add Tag")').click();
        await page.locator('[placeholder="Type to select tag"]').click();

        await expect(page.locator('[aria-label="Autocomplete Options"]')).not.toContainText("Science");
        await expect(page.locator('[aria-label="Autocomplete Options"]')).not.toContainText("Driving");
        await expect(page.locator('[aria-label="Autocomplete Options"]')).toContainText("Drilling");
    });
    test('Can cancel adding tags', async ({ page }) => {
        await createNotebookAndEntry(page);

        // TODO can be removed with fix for https://github.com/nasa/openmct/issues/6411
        await page.locator('[aria-label="Notebook Entry"].is-selected div.c-ne__text').click();

        await selectInspectorTab(page, 'Annotations');

        // Test canceling adding a tag after we click "Type to select tag"
        await page.locator('button:has-text("Add Tag")').click();

        await page.locator('[placeholder="Type to select tag"]').click();

        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();

        await expect(page.locator('button:has-text("Add Tag")')).toBeVisible();

        // Test canceling adding a tag after we just click "Add Tag"
        await page.locator('button:has-text("Add Tag")').click();

        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();

        await expect(page.locator('button:has-text("Add Tag")')).toBeVisible();
    });
    test('Can search for tags and preview works properly', async ({ page }) => {
        await createNotebookEntryAndTags(page);
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('sc');
        await expect(page.locator('[aria-label="Search Result"]')).toContainText("Science");
        await expect(page.locator('[aria-label="Search Result"]')).not.toContainText("Driving");

        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('Sc');
        await expect(page.locator('[aria-label="Search Result"]')).toContainText("Science");
        await expect(page.locator('[aria-label="Search Result"]')).not.toContainText("Driving");

        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('Xq');
        await expect(page.locator('text=No results found')).toBeVisible();

        await createDomainObjectWithDefaults(page, {
            type: 'Display Layout'
        });

        // Go back into edit mode for the display layout
        await page.locator('button[title="Edit"]').click();

        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('Sc');
        await expect(page.locator('[aria-label="Search Result"]')).toContainText("Science");
        await page.getByText('Entry 0').click();
        await expect(page.locator('.js-preview-window')).toBeVisible();
    });

    test('Can delete tags', async ({ page }) => {
        await createNotebookEntryAndTags(page);
        // Delete Driving
        await page.hover('[aria-label="Tag"]:has-text("Driving")');
        await page.locator('[aria-label="Remove tag Driving"]').click();

        await expect(page.locator('[aria-label="Tags Inspector"]')).toContainText("Science");
        await expect(page.locator('[aria-label="Tags Inspector"]')).not.toContainText("Driving");

        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('sc');
        await expect(page.locator('[aria-label="Search Result"]')).not.toContainText("Driving");
    });

    test('Can delete entries without tags', async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/5823'
        });

        await createNotebookEntryAndTags(page);

        await page.locator('text=To start a new entry, click here or drag and drop any object').click();
        const entryLocator = `[aria-label="Notebook Entry Input"] >> nth = 1`;
        await page.locator(entryLocator).click();
        await page.locator(entryLocator).fill(`An entry without tags`);
        await page.locator('[aria-label="Notebook Entry Input"] >> nth=1').press('Enter');

        await page.hover('[aria-label="Notebook Entry Input"] >> nth=1');
        await page.locator('button[title="Delete this entry"]').last().click();
        await expect(page.locator('text=This action will permanently delete this entry. Do you wish to continue?')).toBeVisible();
        await page.locator('button:has-text("Ok")').click();
        await expect(page.locator('text=This action will permanently delete this entry. Do you wish to continue?')).toBeHidden();
    });

    test('Can delete objects with tags and neither return in search', async ({ page }) => {
        await createNotebookEntryAndTags(page);
        // Delete Notebook
        await page.locator('button[title="More options"]').click();
        await page.locator('li[title="Remove this object from its containing object."]').click();
        await page.locator('button:has-text("OK")').click();
        await page.goto('./', { waitUntil: 'networkidle' });

        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('Unnamed');
        await expect(page.locator('text=No results found')).toBeVisible();
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('sci');
        await expect(page.locator('text=No results found')).toBeVisible();
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('dri');
        await expect(page.locator('text=No results found')).toBeVisible();
    });
    test('Tags persist across reload', async ({ page }) => {
        //Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        const clock = await createDomainObjectWithDefaults(page, { type: 'Clock' });

        const ITERATIONS = 4;
        const notebook = await createNotebookEntryAndTags(page, ITERATIONS);

        for (let iteration = 0; iteration < ITERATIONS; iteration++) {
            const entryLocator = `[aria-label="Notebook Entry"] >> nth = ${iteration}`;
            await expect(page.locator(entryLocator)).toContainText("Science");
            await expect(page.locator(entryLocator)).toContainText("Driving");
        }

        await Promise.all([
            page.waitForNavigation(),
            page.goto('./#/browse/mine?hideTree=false'),
            page.click('.c-disclosure-triangle')
        ]);

        const treePane = page.getByRole('tree', {
            name: 'Main Tree'
        });
        // Click Clock
        await treePane.getByRole('treeitem', {
            name: clock.name
        }).click();
        // Click Notebook
        await page.getByRole('treeitem', {
            name: notebook.name
        }).click();

        for (let iteration = 0; iteration < ITERATIONS; iteration++) {
            const entryLocator = `[aria-label="Notebook Entry"] >> nth = ${iteration}`;
            await expect(page.locator(entryLocator)).toContainText("Science");
            await expect(page.locator(entryLocator)).toContainText("Driving");
        }

        //Reload Page
        await Promise.all([
            page.reload(),
            page.waitForLoadState('networkidle')
        ]);

        // Click Notebook
        await page.click(`text="${notebook.name}"`);

        for (let iteration = 0; iteration < ITERATIONS; iteration++) {
            const entryLocator = `[aria-label="Notebook Entry"] >> nth = ${iteration}`;
            await expect(page.locator(entryLocator)).toContainText("Science");
            await expect(page.locator(entryLocator)).toContainText("Driving");
        }
    });
    test('Can cancel adding a tag', async ({ page }) => {
        await createNotebookAndEntry(page);

        // TODO can be removed with fix for https://github.com/nasa/openmct/issues/6411
        await page.locator('[aria-label="Notebook Entry"].is-selected div.c-ne__text').click();

        await selectInspectorTab(page, 'Annotations');

        // Click on the "Add Tag" button
        await page.locator('button:has-text("Add Tag")').click();

        // Click inside the AutoComplete field
        await page.locator('[placeholder="Type to select tag"]').click();

        // Click on the "Tags" header (simulating a click outside the autocomplete)
        await page.locator('div.c-inspect-properties__header:has-text("Tags")').click();

        // Verify there is a button with text "Add Tag"
        await expect(page.locator('button:has-text("Add Tag")')).toBeVisible();

        // Verify the AutoComplete field is hidden
        await expect(page.locator('[placeholder="Type to select tag"]')).toBeHidden();
    });
});
