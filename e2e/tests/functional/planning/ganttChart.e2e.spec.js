/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
const { test, expect } = require('../../../pluginFixtures');
const { createPlanFromJSON, createDomainObjectWithDefaults, selectInspectorTab } = require('../../../appActions');
const testPlan1 = require('../../../test-data/examplePlans/ExamplePlan_Small1.json');
const testPlan2 = require('../../../test-data/examplePlans/ExamplePlan_Small2.json');
const { assertPlanActivities, setBoundsToSpanAllActivities } = require('../../../helper/planningUtils');
const { getPreciseDuration } = require('../../../../src/utils/duration');

test.describe("Gantt Chart", () => {
    let ganttChart;
    test.beforeEach(async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
        ganttChart = await createDomainObjectWithDefaults(page, {
            type: 'Gantt Chart'
        });
        await createPlanFromJSON(page, {
            json: testPlan1,
            parent: ganttChart.uuid
        });
    });

    test("Displays all plan events", async ({ page }) => {
        await page.goto(ganttChart.url);

        await assertPlanActivities(page, testPlan1, ganttChart.url);
    });
    test("Replaces a plan with a new plan", async ({ page }) => {
        await assertPlanActivities(page, testPlan1, ganttChart.url);
        await createPlanFromJSON(page, {
            json: testPlan2,
            parent: ganttChart.uuid
        });
        const replaceModal = page.getByRole('dialog').filter({ hasText: "This action will replace the current Plan. Do you want to continue?" });
        await expect(replaceModal).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        await assertPlanActivities(page, testPlan2, ganttChart.url);
    });
    test("Can select a single activity and display its details in the inspector", async ({ page }) => {
        test.slow();
        await page.goto(ganttChart.url);

        await setBoundsToSpanAllActivities(page, testPlan1, ganttChart.url);

        const activities = Object.values(testPlan1).flat();
        const activity = activities[0];
        await page.locator('g').filter({ hasText: new RegExp(activity.name) }).click();
        await selectInspectorTab(page, 'Activity');

        const startDateTime = await page.locator('.c-inspect-properties__label:has-text("Start DateTime")+.c-inspect-properties__value').innerText();
        const endDateTime = await page.locator('.c-inspect-properties__label:has-text("End DateTime")+.c-inspect-properties__value').innerText();
        const duration = await page.locator('.c-inspect-properties__label:has-text("duration")+.c-inspect-properties__value').innerText();

        const expectedStartDate = new Date(activity.start).toISOString();
        const actualStartDate = new Date(startDateTime).toISOString();
        const expectedEndDate = new Date(activity.end).toISOString();
        const actualEndDate = new Date(endDateTime).toISOString();
        const expectedDuration = getPreciseDuration(activity.end - activity.start);
        const actualDuration = duration;

        expect(expectedStartDate).toEqual(actualStartDate);
        expect(expectedEndDate).toEqual(actualEndDate);
        expect(expectedDuration).toEqual(actualDuration);
    });
});
