/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
* This test suite is meant to be executed against a couchdb container. More doc to come
*
*/

const { test, expect } = require('../../pluginFixtures');

test.describe("CouchDB Status Indicator with mocked responses @couchdb", () => {
    test.use({ failOnConsoleError: false });
    //TODO BeforeAll Verify CouchDB Connectivity with APIContext
    test('Shows green if connected', async ({ page }) => {
        await page.route('**/openmct/mine', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({})
            });
        });

        //Go to baseURL
        await page.goto('./#/browse/mine?hideTree=true&hideInspector=true', { waitUntil: 'networkidle' });
        await expect(page.locator('div:has-text("CouchDB is connected")').nth(3)).toBeVisible();
    });
    test('Shows red if not connected', async ({ page }) => {
        await page.route('**/openmct/**', route => {
            route.fulfill({
                status: 503,
                contentType: 'application/json',
                body: JSON.stringify({})
            });
        });

        //Go to baseURL
        await page.goto('./#/browse/mine?hideTree=true&hideInspector=true', { waitUntil: 'networkidle' });
        await expect(page.locator('div:has-text("CouchDB is offline")').nth(3)).toBeVisible();
    });
    test('Shows unknown if it receives an unexpected response code', async ({ page }) => {
        await page.route('**/openmct/mine', route => {
            route.fulfill({
                status: 418,
                contentType: 'application/json',
                body: JSON.stringify({})
            });
        });

        //Go to baseURL
        await page.goto('./#/browse/mine?hideTree=true&hideInspector=true', { waitUntil: 'networkidle' });
        await expect(page.locator('div:has-text("CouchDB connectivity unknown")').nth(3)).toBeVisible();
    });
});

test.describe("CouchDB initialization with mocked responses @couchdb", () => {
    test.use({ failOnConsoleError: false });
    test("'My Items' folder is created if it doesn't exist", async ({ page }) => {
        const mockedMissingObjectResponsefromCouchDB = {
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({})
        };

        // Override the first request to GET openmct/mine to return a 404.
        // This simulates the case of starting Open MCT with a fresh database
        // and no "My Items" folder created yet.
        await page.route('**/mine', route => {
            route.fulfill(mockedMissingObjectResponsefromCouchDB);
        }, { times: 1 });

        // Set up promise to verify that a PUT request to create "My Items"
        // folder was made.
        const putMineFolderRequest = page.waitForRequest(req =>
            req.url().endsWith('/mine')
            && req.method() === 'PUT');

        // Set up promise to verify that a GET request to retrieve "My Items"
        // folder was made.
        const getMineFolderRequest = page.waitForRequest(req =>
            req.url().endsWith('/mine')
            && req.method() === 'GET');

        // Go to baseURL.
        await page.goto('./', { waitUntil: 'networkidle' });

        // Wait for both requests to resolve.
        await Promise.all([
            putMineFolderRequest,
            getMineFolderRequest
        ]);
    });
});
