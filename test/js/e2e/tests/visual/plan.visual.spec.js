/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const { test } = require('../../pluginFixtures');
const { setBoundsToSpanAllActivities } = require('../../helper/planningUtils');
const { createDomainObjectWithDefaults, createPlanFromJSON } = require('../../appActions');
const percySnapshot = require('@percy/playwright');
const examplePlanLarge = require('../../test-data/examplePlans/ExamplePlan_Large.json');

test.describe('Visual - Planning', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
    });
    test('Plan View', async ({ page, theme }) => {
        const plan = await createPlanFromJSON(page, {
            json: examplePlanLarge
        });

        await setBoundsToSpanAllActivities(page, examplePlanLarge, plan.url);
        await percySnapshot(page, `Plan View (theme: ${theme})`);
    });
    test('Gantt Chart View', async ({ page, theme }) => {
        const ganttChart = await createDomainObjectWithDefaults(page, {
            type: 'Gantt Chart'
        });
        await createPlanFromJSON(page, {
            json: examplePlanLarge,
            parent: ganttChart.uuid
        });
        await setBoundsToSpanAllActivities(page, examplePlanLarge, ganttChart.url);
        await percySnapshot(page, `Gantt Chart View (theme: ${theme})`);
    });
});
