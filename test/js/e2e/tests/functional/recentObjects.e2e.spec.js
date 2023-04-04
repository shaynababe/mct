/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const { test, expect } = require('../../pluginFixtures.js');
const { createDomainObjectWithDefaults } = require('../../appActions.js');
const { waitForAnimations } = require('../../baseFixtures.js');

test.describe('Recent Objects', () => {
    /** @type {import('@playwright/test').Locator} */
    let recentObjectsList;
    /** @type {import('@playwright/test').Locator} */
    let clock;
    /** @type {import('@playwright/test').Locator} */
    let folderA;
    test.beforeEach(async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });

        // Set Recent Objects List locator for subsequent tests
        recentObjectsList = page.getByRole('list', {
            name: 'Recent Objects'
        });

        // Create a folder and nest a Clock within it
        folderA = await createDomainObjectWithDefaults(page, {
            type: 'Folder'
        });
        clock = await createDomainObjectWithDefaults(page, {
            type: 'Clock',
            parent: folderA.uuid
        });

        // Drag the Recent Objects panel up a bit
        await page.locator('.l-pane.l-pane--vertical-handle-before', {
            hasText: 'Recently Viewed'
        }).locator('.l-pane__handle').hover();
        await page.mouse.down();
        await page.mouse.move(0, 100);
        await page.mouse.up();
    });
    test('Navigated objects show up in recents, object renames and deletions are reflected', async ({ page }) => {
        // Verify that both created objects appear in the list and are in the correct order
        assertInitialRecentObjectsListState();

        // Navigate to the folder by clicking on the main object name in the recent objects list item
        await page.getByRole('listitem', { name: folderA.name }).getByText(folderA.name).click();
        await page.waitForURL(`**/${folderA.uuid}?*`);
        expect(recentObjectsList.getByRole('listitem').nth(0).getByText(folderA.name)).toBeTruthy();

        // Rename
        folderA.name = `${folderA.name}-NEW!`;
        await page.locator('.l-browse-bar__object-name').fill("");
        await page.locator('.l-browse-bar__object-name').fill(folderA.name);
        await page.keyboard.press('Enter');

        // Verify rename has been applied in recent objects list item and objects paths
        expect(await page.getByRole('navigation', {
            name: clock.name
        }).locator('a').filter({
            hasText: folderA.name
        }).count()).toBeGreaterThan(0);
        expect(recentObjectsList.getByRole('listitem', { name: folderA.name })).toBeTruthy();

        // Delete
        await page.click('button[title="Show selected item in tree"]');
        // Delete the folder via the left tree pane treeitem context menu
        await page.getByRole('treeitem', { name: new RegExp(folderA.name) }).locator('a').click({
            button: 'right'
        });
        await page.getByRole('menuitem', { name: /Remove/ }).click();
        await page.getByRole('button', { name: 'OK' }).click();

        // Verify that the folder and clock are no longer in the recent objects list
        await expect(recentObjectsList.getByRole('listitem', { name: folderA.name })).toBeHidden();
        await expect(recentObjectsList.getByRole('listitem', { name: clock.name })).toBeHidden();
    });
    test("Clicking on an object in the path of a recent object navigates to the object", async ({ page, openmctConfig }) => {
        const { myItemsFolderName } = openmctConfig;
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/6151'
        });
        await page.goto('./#/browse/mine');

        // Navigate to the folder by clicking on its entry in the Clock's breadcrumb
        const waitForFolderNavigation = page.waitForURL(`**/${folderA.uuid}?*`);
        await page.getByRole('navigation', {
            name: clock.name
        }).locator('a').filter({
            hasText: folderA.name
        }).click();

        // Verify that the hash URL updates correctly
        await waitForFolderNavigation;
        expect(page.url()).toMatch(new RegExp(`.*${folderA.uuid}?.*`));

        // Navigate to My Items by clicking on its entry in the Clock's breadcrumb
        const waitForMyItemsNavigation = page.waitForURL(`**/mine?*`);
        await page.getByRole('navigation', {
            name: clock.name
        }).locator('a').filter({
            hasText: myItemsFolderName
        }).click();

        // Verify that the hash URL updates correctly
        await waitForMyItemsNavigation;
        expect(page.url()).toMatch(new RegExp(`.*mine?.*`));
    });
    test("Clicking on the 'target button' scrolls the object into view in the tree and highlights it", async ({ page }) => {
        const clockTreeItem = page.getByRole('tree', { name: 'Main Tree'}).getByRole('treeitem', { name: clock.name });
        const folderTreeItem = page.getByRole('tree', { name: 'Main Tree'})
            .getByRole('treeitem', {
                name: folderA.name,
                expanded: true
            });

        // Click the "Target" button for the Clock which is nested in a folder
        await page.getByRole('button', { name: `Open and scroll to ${clock.name}`}).click();

        // Assert that the Clock parent folder has expanded and the Clock is visible)
        await expect(folderTreeItem.locator('.c-disclosure-triangle')).toHaveClass(/--expanded/);
        await expect(clockTreeItem).toBeVisible();

        // Assert that the Clock treeitem is highlighted
        await expect(clockTreeItem.locator('.c-tree__item')).toHaveClass(/is-targeted-item/);

        // Wait for highlight animation to end
        await waitForAnimations(clockTreeItem.locator('.c-tree__item'));

        // Assert that the Clock treeitem is no longer highlighted
        await expect(clockTreeItem.locator('.c-tree__item')).not.toHaveClass(/is-targeted-item/);
    });
    test("Persists on refresh", async ({ page }) => {
        assertInitialRecentObjectsListState();
        await page.reload();
        assertInitialRecentObjectsListState();
    });
    test("Displays objects and aliases uniquely", async ({ page }) => {
        const mainTree = page.getByRole('tree', { name: 'Main Tree'});

        // Navigate to the clock and reveal it in the tree
        await page.goto(clock.url);
        await page.getByTitle('Show selected item in tree').click();

        // Right click the clock and create an alias using the "link" context menu action
        const clockTreeItem = page.getByRole('tree', {
            name: 'Main Tree'
        }).getByRole('treeitem', {
            name: clock.name
        });
        await clockTreeItem.click({
            button: 'right'
        });
        await page.getByRole('menuitem', {
            name: /Create Link/
        }).click();
        await page.getByRole('tree', { name: 'Create Modal Tree'}).getByRole('treeitem').first().click();
        await page.getByRole('button', { name: 'Save' }).click();

        // Click the newly created object alias in the tree
        await mainTree.getByRole('treeitem', {
            name: new RegExp(clock.name)
        }).filter({
            has: page.locator('.is-alias')
        }).click();

        // Assert that two recent objects are displayed and one of them is an alias
        expect(await recentObjectsList.getByRole('listitem', { name: clock.name }).count()).toBe(2);
        expect(await recentObjectsList.locator('.is-alias').count()).toBe(1);

        // Assert that the alias and the original's breadcrumbs are different
        const clockBreadcrumbs = recentObjectsList.getByRole('listitem', {name: clock.name}).getByRole('navigation');
        expect(await clockBreadcrumbs.count()).toBe(2);
        expect(await clockBreadcrumbs.nth(0).innerText()).not.toEqual(await clockBreadcrumbs.nth(1).innerText());
    });
    test("Enforces a limit of 20 recent objects and clears the recent objects", async ({ page }) => {
        // Creating 21 objects takes a while, so increase the timeout
        test.slow();

        // Assert that the list initially contains 3 objects (clock, folder, my items)
        expect(await recentObjectsList.locator('.c-recentobjects-listitem').count()).toBe(3);

        let lastFolder;
        let lastClock;
        // Create 19 more objects (3 in beforeEach() + 18 new = 21 total)
        for (let i = 0; i < 9; i++) {
            lastFolder = await createDomainObjectWithDefaults(page, {
                type: "Folder",
                parent: lastFolder?.uuid
            });
            lastClock = await createDomainObjectWithDefaults(page, {
                type: "Clock",
                parent: lastFolder?.uuid
            });
        }

        // Assert that the list contains 20 objects
        expect(await recentObjectsList.locator('.c-recentobjects-listitem').count()).toBe(20);

        // Collapse the tree
        await page.getByTitle("Collapse all tree items").click();
        const lastFolderTreeItem = page.getByRole('tree', { name: 'Main Tree'})
            .getByRole('treeitem', {
                name: lastFolder.name,
                expanded: true
            });
        const lastClockTreeItem = page.getByRole('tree', { name: 'Main Tree'})
            .getByRole('treeitem', {
                name: lastClock.name
            });

        // Test "Open and Scroll To" in a deeply nested tree, while we're here
        await page.getByRole('button', { name: `Open and scroll to ${lastClock.name}`}).click();

        // Assert that the Clock parent folder has expanded and the Clock is visible)
        await expect(lastFolderTreeItem.locator('.c-disclosure-triangle')).toHaveClass(/--expanded/);
        await expect(lastClockTreeItem).toBeVisible();

        // Assert that the Clock treeitem is highlighted
        await expect(lastClockTreeItem.locator('.c-tree__item')).toHaveClass(/is-targeted-item/);

        // Wait for highlight animation to end
        await waitForAnimations(lastClockTreeItem.locator('.c-tree__item'));

        // Assert that the Clock treeitem is no longer highlighted
        await expect(lastClockTreeItem.locator('.c-tree__item')).not.toHaveClass(/is-targeted-item/);

        // Click the aria-label="Clear Recently Viewed" button
        await page.getByRole('button', { name: 'Clear Recently Viewed' }).click();

        // Click on the "OK" button in the confirmation dialog
        await page.getByRole('button', { name: 'OK' }).click();

        // Assert that the list is empty
        expect(await recentObjectsList.locator('.c-recentobjects-listitem').count()).toBe(0);
    });

    function assertInitialRecentObjectsListState() {
        expect(recentObjectsList.getByRole('listitem', { name: clock.name })).toBeTruthy();
        expect(recentObjectsList.getByRole('listitem', { name: folderA.name })).toBeTruthy();
        expect(recentObjectsList.getByRole('listitem', { name: clock.name }).locator('a').getByText(folderA.name)).toBeTruthy();
        expect(recentObjectsList.getByRole('listitem').nth(0).getByText(clock.name)).toBeTruthy();
        expect(recentObjectsList.getByRole('listitem', { name: clock.name }).locator('a').getByText(folderA.name)).toBeTruthy();
        expect(recentObjectsList.getByRole('listitem').nth(1).getByText(folderA.name)).toBeTruthy();
    }
});
