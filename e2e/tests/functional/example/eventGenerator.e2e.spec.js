/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is dedicated to tests which verify the basic operations surrounding the example event generator.
*/

const { test, expect } = require('../../../pluginFixtures');
const { createDomainObjectWithDefaults } = require('../../../appActions');

test.describe('Example Event Generator CRUD Operations', () => {
    test('Can create a Test Event Generator and it results in the table View', async ({ page }) => {
        //Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        //Create a name for the object
        const newObjectName = 'Test Event Generator';

        await createDomainObjectWithDefaults(page, {
            type: 'Event Message Generator',
            name: newObjectName
        });

        //Assertions against newly created object which define standard behavior
        await expect(page.waitForURL(/.*&view=table/)).toBeTruthy();
        await expect(page.locator('.l-browse-bar__object-name')).toContainText(newObjectName);
    });
});

test.describe('Example Event Generator Telemetry Event Verficiation', () => {

    test.fixme('telemetry is coming in for test event', async ({ page }) => {
    // Go to object created in step one
    // Verify the telemetry table is filled with > 1 row
    });
    test.fixme('telemetry is sorted by time ascending', async ({ page }) => {
    // Go to object created in step one
    // Verify the telemetry table has a class with "is-sorting asc"
    });
});
