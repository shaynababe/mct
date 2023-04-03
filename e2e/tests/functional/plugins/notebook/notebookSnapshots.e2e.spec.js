/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
This test suite is dedicated to tests which verify the basic operations surrounding Notebooks.
*/

const { test, expect } = require('../../../../pluginFixtures');
// const { expandTreePaneItemByName, createDomainObjectWithDefaults } = require('../../../../appActions');
// const nbUtils = require('../../../../helper/notebookUtils');

test.describe('Snapshot Menu tests', () => {
    test.fixme('When no default notebook is selected, Snapshot Menu dropdown should only have a single option', async ({ page }) => {
        // There should be no default notebook
        // Clear default notebook if exists using `localStorage.setItem('notebook-storage', null);`
        // refresh page
        // Click on 'Notebook Snaphot Menu'
        // 'save to Notebook Snapshots' should be only option there
    });
    test.fixme('When default notebook is updated selected, Snapshot Menu dropdown should list it as the newest option', async ({ page }) => {
        // Create 2a notebooks
        // Set Notebook A as Default
        // Open Snapshot Menu and note that Notebook A is listed
        // Close Snapshot Menu
        // Set Default Notebook to Notebook B
        // Open Snapshot Notebook and note that Notebook B is listed
        // Select Default Notebook Option and verify that Snapshot is added to Notebook B
    });
    test.fixme('Can add Snapshots via Snapshot Menu and details are correct', async ({ page }) => {
        //Note this should be a visual test, too
        // Create Telemetry object
        // Create A notebook with many pages and sections.
        // Set page and section defaults to be between first and last of many. i.e. 3 of 5
        // Navigate to Telemetry object
        // Select Default Notebook Option and verify that Snapshot is added to Notebook A
        // Verify Snapshot Details appear correctly
    });
    test.fixme('Snapshots adjust time conductor', async ({ page }) => {
        // Create Telemetry object
        // Set Telemetry object's timeconductor to Fixed time with Start and Endtimes are recorded
        // Embed Telemetry object into notebook
        // Set Time Conductor to Local clock
        // Click into embedded telemetry object and verify object appears with same fixed time from record
    });
});

test.describe('Snapshot Container tests', () => {
    test.beforeEach(async ({ page }) => {
        //Navigate to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        // Create Notebook
        // const notebook = await createDomainObjectWithDefaults(page, {
        //     type: 'Notebook',
        //     name: "Test Notebook"
        // });
        // // Create Overlay Plot
        // const snapShotObject = await createDomainObjectWithDefaults(page, {
        //     type: 'Overlay Plot',
        //     name: "Dropped Overlay Plot"
        // });

        await page.getByRole('button', { name: ' Snapshot ' }).click();
        await page.getByRole('menuitem', { name: ' Save to Notebook Snapshots' }).click();
        await page.getByRole('button', { name: 'Show' }).click();

    });
    test.fixme('5 Snapshots can be added to a container', async ({ page }) => {});
    test.fixme('5 Snapshots can be added to a container and Deleted with Delete All action', async ({ page }) => {});
    test.fixme('A snapshot can be Deleted from Container with 3 dot action menu', async ({ page }) => {});
    test.fixme('A snapshot can be Viewed, Annotated, display deleted, and saved from Container with 3 dot action menu', async ({ page }) => {
        await page.locator('.c-snapshot.c-ne__embed').first().getByTitle('More options').click();
        await page.getByRole('menuitem', { name: ' View Snapshot' }).click();
        await expect(page.locator('.c-overlay__outer')).toBeVisible();
        await page.getByTitle('Annotate').click();
        await expect(page.locator('#snap-annotation-canvas')).toBeVisible();
        await page.getByRole('button', { name: '' }).click();
        // await expect(page.locator('#snap-annotation-canvas')).not.toBeVisible();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('button', { name: 'Done' }).click();
        //await expect(await page.locator)
    });
    test('A snapshot can be Quick Viewed from Container with 3 dot action menu', async ({ page }) => {
        await page.locator('.c-snapshot.c-ne__embed').first().getByTitle('More options').click();
        await page.getByRole('menuitem', { name: 'Quick View' }).click();
        await expect(page.locator('.c-overlay__outer')).toBeVisible();
    });
    test.fixme('A snapshot can be Navigated To from Container with 3 dot action menu', async ({ page }) => {});
    test.fixme('A snapshot can be Navigated To Item in Time from Container with 3 dot action menu', async ({ page }) => {});
    test.fixme('A snapshot Container can be open and closed', async ({ page }) => {});
    test.fixme('Can add object to Snapshot container and pull into notebook and create a new entry', async ({ page }) => {
        //Create Notebook
        //Create Telemetry Object
        //From Telemetry Object, use 'save to Notebook Snapshots'
        //Snapshots indicator should blink, click on it to view snapshots
        //Navigate to Notebook
        //Drag and Drop onto droppable area for new entry
        //New Entry created with given snapshot added
        //Snapshot removed from container?
    });
    test.fixme('Can add object to Snapshot container and pull into notebook and existing entry', async ({ page }) => {
        //Create Notebook
        //Create Telemetry Object
        //From Telemetry Object, use 'save to Notebook Snapshots'
        //Snapshots indicator should blink, click on it to view snapshots
        //Navigate to Notebook
        //Drag and Drop into exiting entry
        //Existing Entry updated with given snapshot
        //Snapshot removed from container?
    });
    test.fixme('Verify Embedded options for PNG, JPG, and Annotate work correctly', async ({ page }) => {
        //Add snapshot to container
        //Verify PNG, JPG, and Annotate buttons work correctly
    });
});
