/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const { test, expect } = require('../../../pluginFixtures');
const { createDomainObjectWithDefaults, createPlanFromJSON } = require('../../../appActions');

const testPlan = {
    "TEST_GROUP": [
        {
            "name": "Past event 1",
            "start": 1660320408000,
            "end": 1660343797000,
            "type": "TEST-GROUP",
            "color": "orange",
            "textColor": "white"
        },
        {
            "name": "Past event 2",
            "start": 1660406808000,
            "end": 1660429160000,
            "type": "TEST-GROUP",
            "color": "orange",
            "textColor": "white"
        },
        {
            "name": "Past event 3",
            "start": 1660493208000,
            "end": 1660503981000,
            "type": "TEST-GROUP",
            "color": "orange",
            "textColor": "white"
        },
        {
            "name": "Past event 4",
            "start": 1660579608000,
            "end": 1660624108000,
            "type": "TEST-GROUP",
            "color": "orange",
            "textColor": "white"
        },
        {
            "name": "Past event 5",
            "start": 1660666008000,
            "end": 1660681529000,
            "type": "TEST-GROUP",
            "color": "orange",
            "textColor": "white"
        }
    ]
};

test.describe("Time Strip", () => {
    test("Create two Time Strips, add a single Plan to both, and verify they can have separate Indepdenent Time Contexts @unstable", async ({ page }) => {
        test.info().annotations.push({
            type: 'issue',
            description: 'https://github.com/nasa/openmct/issues/5627'
        });

        // Constant locators
        const independentTimeConductorInputs = page.locator('.l-shell__main-independent-time-conductor .c-input--datetime');
        const activityBounds = page.locator('.activity-bounds');

        // Goto baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        const timestrip = await test.step("Create a Time Strip", async () => {
            const createdTimeStrip = await createDomainObjectWithDefaults(page, { type: 'Time Strip' });
            const objectName = await page.locator('.l-browse-bar__object-name').innerText();
            expect(objectName).toBe(createdTimeStrip.name);

            return createdTimeStrip;
        });

        const plan = await test.step("Create a Plan and add it to the timestrip", async () => {
            const createdPlan = await createPlanFromJSON(page, {
                name: 'Test Plan',
                json: testPlan
            });

            await page.goto(timestrip.url);
            // Expand the tree to show the plan
            await page.click("button[title='Show selected item in tree']");
            await page.dragAndDrop(`role=treeitem[name=/${createdPlan.name}/]`, '.c-object-view');
            await page.click("button[title='Save']");
            await page.click("li[title='Save and Finish Editing']");
            const startBound = testPlan.TEST_GROUP[0].start;
            const endBound = testPlan.TEST_GROUP[testPlan.TEST_GROUP.length - 1].end;

            // Switch to fixed time mode with all plan events within the bounds
            await page.goto(`${timestrip.url}?tc.mode=fixed&tc.startBound=${startBound}&tc.endBound=${endBound}&tc.timeSystem=utc&view=time-strip.view`);

            // Verify all events are displayed
            const eventCount = await page.locator('.activity-bounds').count();
            expect(eventCount).toEqual(testPlan.TEST_GROUP.length);

            return createdPlan;
        });

        await test.step("TimeStrip can use the Independent Time Conductor", async () => {
            // Activate Independent Time Conductor in Fixed Time Mode
            await page.click('.c-toggle-switch__slider');
            expect(await activityBounds.count()).toEqual(0);

            // Set the independent time bounds so that only one event is shown
            const startBound = testPlan.TEST_GROUP[0].start;
            const endBound = testPlan.TEST_GROUP[0].end;
            const startBoundString = new Date(startBound).toISOString().replace('T', ' ');
            const endBoundString = new Date(endBound).toISOString().replace('T', ' ');

            await independentTimeConductorInputs.nth(0).fill('');
            await independentTimeConductorInputs.nth(0).fill(startBoundString);
            await page.keyboard.press('Enter');
            await independentTimeConductorInputs.nth(1).fill('');
            await independentTimeConductorInputs.nth(1).fill(endBoundString);
            await page.keyboard.press('Enter');
            expect(await activityBounds.count()).toEqual(1);
        });

        await test.step("Can have multiple TimeStrips with the same plan linked and different Independent Time Contexts", async () => {
            // Create another Time Strip and verify that it has been created
            const createdTimeStrip = await createDomainObjectWithDefaults(page, {
                type: 'Time Strip',
                name: "Another Time Strip"
            });

            const objectName = await page.locator('.l-browse-bar__object-name').innerText();
            expect(objectName).toBe(createdTimeStrip.name);

            // Drag the existing Plan onto the newly created Time Strip, and save.
            await page.dragAndDrop(`role=treeitem[name=/${plan.name}/]`, '.c-object-view');
            await page.click("button[title='Save']");
            await page.click("li[title='Save and Finish Editing']");

            // Activate Independent Time Conductor in Fixed Time Mode
            await page.click('.c-toggle-switch__slider');

            // All events should be displayed at this point because the
            // initial independent context bounds will match the global bounds
            expect(await activityBounds.count()).toEqual(5);

            // Set the independent time bounds so that two events are shown
            const startBound = testPlan.TEST_GROUP[0].start;
            const endBound = testPlan.TEST_GROUP[1].end;
            const startBoundString = new Date(startBound).toISOString().replace('T', ' ');
            const endBoundString = new Date(endBound).toISOString().replace('T', ' ');

            await independentTimeConductorInputs.nth(0).fill('');
            await independentTimeConductorInputs.nth(0).fill(startBoundString);
            await page.keyboard.press('Enter');
            await independentTimeConductorInputs.nth(1).fill('');
            await independentTimeConductorInputs.nth(1).fill(endBoundString);
            await page.keyboard.press('Enter');

            // Verify that two events are displayed
            expect(await activityBounds.count()).toEqual(2);

            // Switch to the previous Time Strip and verify that only one event is displayed
            await page.goto(timestrip.url);
            expect(await activityBounds.count()).toEqual(1);
        });
    });
});
