/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import EventMessageGeneratorPlugin from './plugin.js';
import {
    createOpenMct,
    resetApplicationState
} from '../../src/utils/testing';

describe('the plugin', () => {
    let openmct;
    const mockDomainObject = {
        identifier: {
            namespace: '',
            key: 'some-value'
        },
        telemetry: {
            duration: 0
        },
        options: {},
        type: 'eventGenerator'
    };

    beforeEach((done) => {
        const options = {};
        openmct = createOpenMct();
        openmct.install(new EventMessageGeneratorPlugin(options));
        openmct.on('start', done);
        openmct.startHeadless();
    });

    afterEach(async () => {
        await resetApplicationState(openmct);
    });

    describe('the plugin', () => {
        it("supports subscription", (done) => {
            const unsubscribe = openmct.telemetry.subscribe(mockDomainObject, (telemetry) => {
                expect(telemetry).not.toEqual(null);
                expect(telemetry.message).toContain('CC: Eagle, Houston');
                expect(unsubscribe).not.toEqual(null);
                unsubscribe();
                done();
            });
        });

        it("supports requests without start/end defined", async () => {
            const telemetry = await openmct.telemetry.request(mockDomainObject);
            expect(telemetry[0].message).toContain('CC: Eagle, Houston');
        });

        it("supports requests with arbitrary start time in the past", async () => {
            mockDomainObject.options.start = 100000000000; // Mar 03 1973
            const telemetry = await openmct.telemetry.request(mockDomainObject);
            expect(telemetry[0].message).toContain('CC: Eagle, Houston');
        });
    });
});
