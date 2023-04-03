/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { expect } from '../pluginFixtures';

/**
 * Asserts that the number of activities in the plan view matches the number of
 * activities in the plan data within the specified time bounds. Performs an assertion
 * for each activity in the plan data per group, using the earliest activity's
 * start time as the start bound and the current activity's end time as the end bound.
 * @param {import('@playwright/test').Page} page the page
 * @param {object} plan The raw plan json to assert against
 * @param {string} objectUrl The URL of the object to assert against (plan or gantt chart)
 */
export async function assertPlanActivities(page, plan, objectUrl) {
    const groups = Object.keys(plan);
    for (const group of groups) {
        for (let i = 0; i < plan[group].length; i++) {
            // Set the startBound to the start time of the first activity in the group
            const startBound = plan[group][0].start;
            // Set the endBound to the end time of the current activity
            let endBound = plan[group][i].end;
            if (endBound === startBound) {
                // Prevent oddities with setting start and end bound equal
                // via URL params
                endBound += 1;
            }

            // Switch to fixed time mode with all plan events within the bounds
            await page.goto(`${objectUrl}?tc.mode=fixed&tc.startBound=${startBound}&tc.endBound=${endBound}&tc.timeSystem=utc&view=plan.view`);

            // Assert that the number of activities in the plan view matches the number of
            // activities in the plan data within the specified time bounds
            const eventCount = await page.locator('.activity-bounds').count();
            expect(eventCount).toEqual(Object.values(plan)
                .flat()
                .filter(event =>
                    activitiesWithinTimeBounds(event.start, event.end, startBound, endBound)).length);
        }
    }
}

/**
 * Returns true if the activities time bounds overlap, false otherwise.
* @param {number} start1 the start time of the first activity
* @param {number} end1 the end time of the first activity
* @param {number} start2 the start time of the second activity
* @param {number} end2 the end time of the second activity
* @returns {boolean} true if the activities overlap, false otherwise
*/
function activitiesWithinTimeBounds(start1, end1, start2, end2) {
    return (start1 >= start2 && start1 <= end2)
         || (end1 >= start2 && end1 <= end2)
         || (start2 >= start1 && start2 <= end1)
         || (end2 >= start1 && end2 <= end1);
}

/**
 * Navigate to the plan view, switch to fixed time mode,
 * and set the bounds to span all activities.
 * @param {import('@playwright/test').Page} page
 * @param {object} planJson
 * @param {string} planObjectUrl
 */
export async function setBoundsToSpanAllActivities(page, planJson, planObjectUrl) {
    const activities = Object.values(planJson).flat();
    // Get the earliest start value
    const start = Math.min(...activities.map(activity => activity.start));
    // Get the latest end value
    const end = Math.max(...activities.map(activity => activity.end));
    // Set the start and end bounds to the earliest start and latest end
    await page.goto(`${planObjectUrl}?tc.mode=fixed&tc.startBound=${start}&tc.endBound=${end}&tc.timeSystem=utc&view=plan.view`);
}
