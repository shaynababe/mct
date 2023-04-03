/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const { test } = require('../../pluginFixtures');
const percySnapshot = require('@percy/playwright');
const { expandTreePaneItemByName, createDomainObjectWithDefaults } = require('../../appActions');

test.describe('Visual - Notebook', () => {
    test('Accepts dropped objects as embeds @unstable', async ({ page, theme, openmctConfig }) => {
        const { myItemsFolderName } = openmctConfig;
        await page.goto('./#/browse/mine', { waitUntil: 'networkidle' });

        // Create Notebook
        const notebook = await createDomainObjectWithDefaults(page, {
            type: 'Notebook',
            name: "Embed Test Notebook"
        });
        // Create Overlay Plot
        await createDomainObjectWithDefaults(page, {
            type: 'Overlay Plot',
            name: "Dropped Overlay Plot"
        });

        await expandTreePaneItemByName(page, myItemsFolderName);

        await page.goto(notebook.url);
        await page.dragAndDrop('role=treeitem[name=/Dropped Overlay Plot/]', '.c-notebook__drag-area');

        await percySnapshot(page, `Notebook w/ dropped embed (theme: ${theme})`);

    });
});
