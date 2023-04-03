/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/*
This test suite is an initial example for memory leak testing using performance. This configuration and execution must
be kept separate from the traditional performance measurements to avoid any "observer" effects associated with tracing
or profiling playwright and/or the browser.

Based on a pattern identified in https://github.com/trentmwillis/devtools-protocol-demos/blob/master/testing-demos/memory-leak-by-heap.js
and https://github.com/paulirish/automated-chrome-profiling/issues/3

Best path forward: https://github.com/cowchimp/headless-devtools/blob/master/src/Memory/example.js

*/

const { test, expect } = require('@playwright/test');

const filePath = 'e2e/test-data/PerformanceDisplayLayout.json';

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip('Memory Performance tests', () => {
    test.beforeEach(async ({ page, browser }, testInfo) => {
        // Go to baseURL
        await page.goto('./', { waitUntil: 'networkidle' });

        // Click a:has-text("My Items")
        await page.locator('a:has-text("My Items")').click({
            button: 'right'
        });

        // Click text=Import from JSON
        await page.locator('text=Import from JSON').click();

        // Upload Performance Display Layout.json
        await page.setInputFiles('#fileElem', filePath);

        // Click text=OK
        await page.locator('text=OK').click();

        await expect(page.locator('a:has-text("Performance Display Layout Display Layout")')).toBeVisible();
    });

    test('Embedded View Large for Imagery is performant in Fixed Time', async ({ page, browser }) => {

        await page.goto('./', {waitUntil: 'networkidle'});

        // To to Search Available after Launch
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').click();
        // Fill Search input
        await page.locator('[aria-label="OpenMCT Search"] input[type="search"]').fill('Performance Display Layout');
        //Search Result Appears and is clicked
        await Promise.all([
            page.waitForNavigation(),
            page.locator('a:has-text("Performance Display Layout")').first().click()
        ]);

        //Time to Example Imagery Frame loads within Display Layout
        await page.waitForSelector('.c-imagery__main-image__bg', { state: 'visible'});
        //Time to Example Imagery object loads
        await page.waitForSelector('.c-imagery__main-image__background-image', { state: 'visible'});

        const client = await page.context().newCDPSession(page);
        await client.send('HeapProfiler.enable');
        await client.send('HeapProfiler.startSampling');
        // await client.send('HeapProfiler.collectGarbage');
        await client.send('Performance.enable');

        let performanceMetricsBefore = await client.send('Performance.getMetrics');
        console.log(performanceMetricsBefore.metrics);

        //await client.send('Performance.disable');

        //Open Large view
        await page.locator('button:has-text("Large View")').click();
        await client.send('HeapProfiler.takeHeapSnapshot');

        //Time to Imagery Rendered in Large Frame
        await page.waitForSelector('.c-imagery__main-image__bg', { state: 'visible'});

        //Time to Example Imagery object loads
        await page.waitForSelector('.c-imagery__main-image__background-image', { state: 'visible'});

        // Click Close Icon
        await page.locator('.c-click-icon').click();

        //Time to Example Imagery Frame loads within Display Layout
        await page.waitForSelector('.c-imagery__main-image__bg', { state: 'visible'});
        //Time to Example Imagery object loads
        await page.waitForSelector('.c-imagery__main-image__background-image', { state: 'visible'});

        await client.send('HeapProfiler.collectGarbage');
        //await client.send('Performance.enable');

        let performanceMetricsAfter = await client.send('Performance.getMetrics');
        console.log(performanceMetricsAfter.metrics);

        //await client.send('Performance.disable');

    });
});
