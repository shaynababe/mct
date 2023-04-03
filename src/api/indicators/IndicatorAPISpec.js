/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import { createOpenMct, resetApplicationState } from '../../utils/testing';
import SimpleIndicator from './SimpleIndicator';

describe("The Indicator API", () => {
    let openmct;

    beforeEach(() => {
        openmct = createOpenMct();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    function generateIndicator(className, label, priority) {
        const element = document.createElement('div');
        element.classList.add(className);
        const textNode = document.createTextNode(label);
        element.appendChild(textNode);
        const testIndicator = {
            element,
            priority
        };

        return testIndicator;
    }

    it("can register an indicator", () => {
        const testIndicator = generateIndicator('test-indicator', 'This is a test indicator', 2);
        openmct.indicators.add(testIndicator);
        expect(openmct.indicators.indicatorObjects).toBeDefined();
        // notifier indicator is installed by default
        expect(openmct.indicators.indicatorObjects.length).toBe(2);
    });

    it("can order indicators based on priority", () => {
        const testIndicator1 = generateIndicator('test-indicator-1', 'This is a test indicator', openmct.priority.LOW);
        openmct.indicators.add(testIndicator1);

        const testIndicator2 = generateIndicator('test-indicator-2', 'This is another test indicator', openmct.priority.DEFAULT);
        openmct.indicators.add(testIndicator2);

        const testIndicator3 = generateIndicator('test-indicator-3', 'This is yet another test indicator', openmct.priority.LOW);
        openmct.indicators.add(testIndicator3);

        const testIndicator4 = generateIndicator('test-indicator-4', 'This is yet another test indicator', openmct.priority.HIGH);
        openmct.indicators.add(testIndicator4);

        expect(openmct.indicators.indicatorObjects.length).toBe(5);
        const indicatorObjectsByPriority = openmct.indicators.getIndicatorObjectsByPriority();
        expect(indicatorObjectsByPriority.length).toBe(5);
        expect(indicatorObjectsByPriority[2].priority).toBe(openmct.priority.DEFAULT);
    });

    it("the simple indicator can be added", () => {
        const simpleIndicator = new SimpleIndicator(openmct);
        openmct.indicators.add(simpleIndicator);

        expect(openmct.indicators.indicatorObjects.length).toBe(2);
    });
});
