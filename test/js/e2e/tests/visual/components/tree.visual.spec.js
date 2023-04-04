/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const { test } = require('../../../pluginFixtures.js');
const { createDomainObjectWithDefaults } = require('../../../appActions.js');

const percySnapshot = require('@percy/playwright');

test.describe('Visual - Tree Pane', () => {
    test('Tree pane in various states @unstable', async ({ page, theme, openmctConfig }) => {
        const { myItemsFolderName } = openmctConfig;
        await page.goto('./#/browse/mine', { waitUntil: 'networkidle' });

        const foo = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: "Foo Folder"
        });

        const bar = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: "Bar Folder",
            parent: foo.uuid
        });

        const baz = await createDomainObjectWithDefaults(page, {
            type: 'Folder',
            name: "Baz Folder",
            parent: bar.uuid
        });

        await createDomainObjectWithDefaults(page, {
            type: 'Clock',
            name: 'A Clock'
        });

        await createDomainObjectWithDefaults(page, {
            type: 'Clock',
            name: 'Z Clock'
        });

        const treePane = "[role=tree][aria-label='Main Tree']";

        await percySnapshot(page, `Tree Pane w/ collapsed tree (theme: ${theme})`, {
            scope: treePane
        });

        await expandTreePaneItemByName(page, myItemsFolderName);

        await page.goto(foo.url);
        await page.dragAndDrop('role=treeitem[name=/A Clock/]', '.c-object-view');
        await page.dragAndDrop('role=treeitem[name=/Z Clock/]', '.c-object-view');
        await page.goto(bar.url);
        await page.dragAndDrop('role=treeitem[name=/A Clock/]', '.c-object-view');
        await page.dragAndDrop('role=treeitem[name=/Z Clock/]', '.c-object-view');
        await page.goto(baz.url);
        await page.dragAndDrop('role=treeitem[name=/A Clock/]', '.c-object-view');
        await page.dragAndDrop('role=treeitem[name=/Z Clock/]', '.c-object-view');

        await percySnapshot(page, `Tree Pane w/ single level expanded (theme: ${theme})`, {
            scope: treePane
        });

        await expandTreePaneItemByName(page, foo.name);
        await expandTreePaneItemByName(page, bar.name);
        await expandTreePaneItemByName(page, baz.name);

        await percySnapshot(page, `Tree Pane w/ multiple levels expanded (theme: ${theme})`, {
            scope: treePane
        });
    });
});

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} name
 */
async function expandTreePaneItemByName(page, name) {
    const treePane = page.getByTestId('tree-pane');
    const treeItem = treePane.locator(`role=treeitem[expanded=false][name=/${name}/]`);
    const expandTriangle = treeItem.locator('.c-disclosure-triangle');
    await expandTriangle.click();
}
