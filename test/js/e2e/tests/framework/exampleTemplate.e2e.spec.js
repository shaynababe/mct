/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
* This test suite template is to be used when creating new test suites. It will be kept up to date with the latest improvements
* made by the Open MCT team. It will also follow our best pratices as those evolve. Please use this structure as a _reference_ and clear
* or update any references when creating a new test suite!
*
* To illustrate current best practices, we've included a mocked up test suite for Renaming a Timer domain object.
*
* Demonstrated:
* - Using appActions to leverage existing functions
* - Structure
* - @unstable annotation
* - await, expect, test, describe syntax
* - Writing a custom function for a test suite
* - Test stub for unfinished test coverage (test.fixme)
*
* The structure should follow
* 1. imports
* 2. test.describe()
* 3. -> test1
*    -> test2
*    -> test3(stub)
* 4. Any custom functions
*/

// Structure: Some standard Imports. Please update the required pathing.
const { test, expect } = require('../../pluginFixtures');
const { createDomainObjectWithDefaults } = require('../../appActions');

/**
 * Structure:
 *  Try to keep a single describe block per logical groups of tests.
 *  If your test runtime exceeds 5 minutes or 500 lines, it's likely that it will need to be split.
 *
 * Annotations:
 *  Please use the @unstable tag at the end of the test title so that our automation can pick it up
 *  as a part of our test promotion pipeline.
 */
test.describe('Renaming Timer Object', () => {
    // Top-level declaration of the Timer object created in beforeEach().
    // We can then use this throughout the entire test suite.
    let timer;
    test.beforeEach(async ({ page }) => {
        // Open a browser, navigate to the main page, and wait until all network events to resolve
        await page.goto('./', { waitUntil: 'networkidle' });

        // We provide some helper functions in appActions like `createDomainObjectWithDefaults()`.
        // This example will create a Timer object with default properties, under the root folder:
        timer = await createDomainObjectWithDefaults(page, { type: 'Timer' });

        // Assert the object to be created and check its name in the title
        await expect(page.locator('.l-browse-bar__object-name')).toContainText(timer.name);
    });

    /**
     * Make sure to use testcase names which are descriptive and easy to understand.
     * A good testcase name concisely describes the test's goal(s) and should give
     * some hint as to what went wrong if the test fails.
     */
    test('An existing Timer object can be renamed via the 3dot actions menu', async ({ page }) => {
        const newObjectName = "Renamed Timer";

        // We've created an example of a shared function which pases the page and newObjectName values
        await renameTimerFrom3DotMenu(page, timer.url, newObjectName);

        // Assert that the name has changed in the browser bar to the value we assigned above
        await expect(page.locator('.l-browse-bar__object-name')).toContainText(newObjectName);
    });

    test('An existing Timer object can be renamed twice', async ({ page }) => {
        const newObjectName = "Renamed Timer";
        const newObjectName2 = "Re-Renamed Timer";

        await renameTimerFrom3DotMenu(page, timer.url, newObjectName);

        // Assert that the name has changed in the browser bar to the value we assigned above
        await expect(page.locator('.l-browse-bar__object-name')).toContainText(newObjectName);

        // Rename the Timer object again
        await renameTimerFrom3DotMenu(page, timer.url, newObjectName2);

        // Assert that the name has changed in the browser bar to the second value
        await expect(page.locator('.l-browse-bar__object-name')).toContainText(newObjectName2);
    });

    /**
     * If you run out of time to write new tests, please stub in the missing tests
     * in-place with a test.fixme and BDD-style test steps.
     * Someone will carry the baton!
     */
    test.fixme('Can Rename Timer Object from Tree', async ({ page }) => {
        //Create a new object
        //Copy this object
        //Delete first object
        //Expect copied object to persist
    });
});

/**
 * Structure:
 * Custom functions should be declared last.
 * We are leaning on JSDoc pretty heavily to describe functionality. It is not required, but highly recommended.
 */

/**
 * This is an example of a function which is shared between testcases in this test suite. When refactoring, we'll be looking
 * for common functionality which makes sense to generalize for the entire test framework.
 * @param {import('@playwright/test').Page} page
 * @param {string} timerUrl The URL of the timer object to be renamed
 * @param {string} newNameForTimer New name for object
 */
async function renameTimerFrom3DotMenu(page, timerUrl, newNameForTimer) {
    // Navigate to the timer object
    await page.goto(timerUrl);

    // Click on 3 Dot Menu
    await page.locator('button[title="More options"]').click();

    // Click text=Edit Properties...
    await page.locator('text=Edit Properties...').click();

    // Rename the timer object
    await page.locator('text=Properties Title Notes >> input[type="text"]').fill(newNameForTimer);

    // Click Ok button to Save
    await page.locator('button:has-text("OK")').click();
}
