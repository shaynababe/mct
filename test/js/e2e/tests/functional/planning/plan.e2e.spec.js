/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

const { test } = require('../../../pluginFixtures');
const { createPlanFromJSON } = require('../../../appActions');
const testPlan1 = require('../../../test-data/examplePlans/ExamplePlan_Small1.json');
const { assertPlanActivities } = require('../../../helper/planningUtils');

test.describe("Plan", () => {
    let plan;
    test.beforeEach(async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
        plan = await createPlanFromJSON(page, {
            json: testPlan1
        });
    });

    test("Displays all plan events", async ({ page }) => {
        await assertPlanActivities(page, testPlan1, plan.url);
    });
});
