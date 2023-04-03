/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import PerformancePlugin from './plugin.js';
import { createOpenMct, resetApplicationState } from 'utils/testing';

describe('the plugin', () => {
    let openmct;
    let element;
    let child;

    let performanceIndicator;

    beforeEach(done => {
        openmct = createOpenMct();

        element = document.createElement('div');
        child = document.createElement('div');
        element.appendChild(child);

        openmct.install(new PerformancePlugin());

        openmct.on('start', done);

        performanceIndicator = openmct.indicators.indicatorObjects.find(indicator => {
            return indicator.text && indicator.text() === '~ fps';
        });

        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('installs the performance indicator', () => {
        expect(performanceIndicator).toBeDefined();
    });

    it('calculates an fps value', async () => {
        await loopForABit();
        // eslint-disable-next-line radix
        const fps = parseInt(performanceIndicator.text().split(' fps')[0]);
        expect(fps).toBeGreaterThan(0);
    });

    function loopForABit() {
        let frames = 0;

        return new Promise(resolve => {
            requestAnimationFrame(function loop() {
                if (++frames > 90) {
                    resolve();
                } else {
                    requestAnimationFrame(loop);
                }
            });
        });
    }
});
