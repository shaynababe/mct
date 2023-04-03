/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is dedicated to tests which verify the basic operations surrounding moving & linking objects.
*/

const { test, expect } = require('../../pluginFixtures');
const { createDomainObjectWithDefaults } = require('../../appActions');

test.describe('Move & link item tests', () => {
    test('Create a basic object and verify that it can be moved to another folder', async ({ page, openmctConfig }) => {
        const { myItemsFolderName } = openmctConfig;

        // Go to Open MCT
        await page.goto('./');

        const parentFolder = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: 'Parent Folder'
        });
        const childFolder = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: 'Child Folder',
            parent: parentFolder.uuid
        });
        const grandchildFolder = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: 'Grandchild Folder',
            parent: childFolder.uuid
        });

        // Attempt to move parent to its own grandparent
        await page.locator('button[title="Show selected item in tree"]').click();

        const treePane = page.getByRole('tree', {
            name: 'Main Tree'
        });
        await treePane.getByRole('treeitem', {
            name: 'Parent Folder'
        }).click({
            button: 'right'
        });

        await page.getByRole('menuitem', {
            name: /Move/
        }).click();

        const createModalTree = page.getByRole('tree', {
            name: "Create Modal Tree"
        });
        const myItemsLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: myItemsFolderName
        });
        await myItemsLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await myItemsLocatorTreeItem.click();

        const parentFolderLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: parentFolder.name
        });
        await parentFolderLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await parentFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();

        const childFolderLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: new RegExp(childFolder.name)
        });
        await childFolderLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await childFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();

        const grandchildFolderLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: grandchildFolder.name
        });
        await grandchildFolderLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await grandchildFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();

        await parentFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();
        await page.locator('[aria-label="Cancel"]').click();

        // Move Child Folder from Parent Folder to My Items
        await treePane.getByRole('treeitem', {
            name: new RegExp(childFolder.name)
        }).click({
            button: 'right'
        });
        await page.getByRole('menuitem', {
            name: /Move/
        }).click();
        await myItemsLocatorTreeItem.click();

        await page.locator('[aria-label="Save"]').click();
        const myItemsPaneTreeItem = treePane.getByRole('treeitem', {
            name: myItemsFolderName
        });

        // Expect that Child Folder is in My Items, the root folder
        expect(myItemsPaneTreeItem.locator('nth=0:has(text=Child Folder)')).toBeTruthy();
    });
    test('Create a basic object and verify that it cannot be moved to telemetry object without Composition Provider', async ({ page, openmctConfig }) => {
        const { myItemsFolderName } = openmctConfig;

        // Go to Open MCT
        await page.goto('./');

        // Create Telemetry Table
        let telemetryTable = 'Test Telemetry Table';
        await page.locator('button:has-text("Create")').click();
        await page.locator('li[role="menuitem"]:has-text("Telemetry Table")').click();
        await page.locator('text=Properties Title Notes >> input[type="text"]').click();
        await page.locator('text=Properties Title Notes >> input[type="text"]').fill(telemetryTable);

        await page.locator('button:has-text("OK")').click();

        // Finish editing and save Telemetry Table
        await page.locator('.c-button--menu.c-button--major.icon-save').click();
        await page.locator('text=Save and Finish Editing').click();

        // Create New Folder Basic Domain Object
        let folder = 'Test Folder';
        await page.locator('button:has-text("Create")').click();
        await page.locator('li[role="menuitem"]:has-text("Folder")').click();
        await page.locator('text=Properties Title Notes >> input[type="text"]').click();
        await page.locator('text=Properties Title Notes >> input[type="text"]').fill(folder);

        // See if it's possible to put the folder in the Telemetry object during creation (Soft Assert)
        await page.locator(`form[name="mctForm"] >> text=${telemetryTable}`).click();
        let okButton = page.locator('button.c-button.c-button--major:has-text("OK")');
        let okButtonStateDisabled = await okButton.isDisabled();
        expect.soft(okButtonStateDisabled).toBeTruthy();

        // Continue test regardless of assertion and create it in My Items
        await page.locator(`form[name="mctForm"] >> text=${myItemsFolderName}`).click();
        await page.locator('button:has-text("OK")').click();

        // Open My Items
        await page.locator(`text=Open MCT ${myItemsFolderName} >> span`).nth(3).click();

        // Select Folder Object and select Move from context menu
        await Promise.all([
            page.waitForNavigation(),
            page.locator(`a:has-text("${folder}")`).click()
        ]);
        await page.locator('.c-tree__item.is-navigated-object .c-tree__item__label .c-tree__item__type-icon').click({
            button: 'right'
        });
        await page.locator('li.icon-move').click();

        // See if it's possible to put the folder in the Telemetry object after creation
        await page.locator(`text=Location Open MCT ${myItemsFolderName} >> span`).nth(3).click();
        await page.locator(`form[name="mctForm"] >> text=${telemetryTable}`).click();
        let okButton2 = page.locator('button.c-button.c-button--major:has-text("OK")');
        let okButtonStateDisabled2 = await okButton2.isDisabled();
        expect(okButtonStateDisabled2).toBeTruthy();
    });

    test('Create a basic object and verify that it can be linked to another folder', async ({ page, openmctConfig }) => {
        const { myItemsFolderName } = openmctConfig;

        // Go to Open MCT
        await page.goto('./');

        const parentFolder = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: 'Parent Folder'
        });
        const childFolder = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: 'Child Folder',
            parent: parentFolder.uuid
        });
        const grandchildFolder = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: 'Grandchild Folder',
            parent: childFolder.uuid
        });

        // Attempt to move parent to its own grandparent
        await page.locator('button[title="Show selected item in tree"]').click();

        const treePane = page.getByRole('tree', {
            name: 'Main Tree'
        });
        await treePane.getByRole('treeitem', {
            name: 'Parent Folder'
        }).click({
            button: 'right'
        });

        await page.getByRole('menuitem', {
            name: /Move/
        }).click();

        const createModalTree = page.getByRole('tree', {
            name: "Create Modal Tree"
        });
        const myItemsLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: myItemsFolderName
        });
        await myItemsLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await myItemsLocatorTreeItem.click();

        const parentFolderLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: parentFolder.name
        });
        await parentFolderLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await parentFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();

        const childFolderLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: new RegExp(childFolder.name)
        });
        await childFolderLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await childFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();

        const grandchildFolderLocatorTreeItem = createModalTree.getByRole('treeitem', {
            name: grandchildFolder.name
        });
        await grandchildFolderLocatorTreeItem.locator('.c-disclosure-triangle').click();
        await grandchildFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();

        await parentFolderLocatorTreeItem.click();
        await expect(page.locator('[aria-label="Save"]')).toBeDisabled();
        await page.locator('[aria-label="Cancel"]').click();

        // Move Child Folder from Parent Folder to My Items
        await treePane.getByRole('treeitem', {
            name: new RegExp(childFolder.name)
        }).click({
            button: 'right'
        });
        await page.getByRole('menuitem', {
            name: /Link/
        }).click();
        await myItemsLocatorTreeItem.click();

        await page.locator('[aria-label="Save"]').click();
        const myItemsPaneTreeItem = treePane.getByRole('treeitem', {
            name: myItemsFolderName
        });

        // Expect that Child Folder is in My Items, the root folder
        expect(myItemsPaneTreeItem.locator('nth=0:has(text=Child Folder)')).toBeTruthy();
    });
});

test.fixme('Cannot move a previously created domain object to non-peristable object in Move Modal', async ({ page }) => {
    //Create a domain object
    //Save Domain object
    //Move Object and verify that cannot select non-persistable object
    //Move Object to My Items
    //Verify successful move
});
