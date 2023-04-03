/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

describe("The URLTimeSettingsSynchronizer", () => {
    let appHolder;
    let openmct;
    let resolveFunction;
    let oldHash;

    beforeEach((done) => {
        openmct = createOpenMct();
        openmct.install(openmct.plugins.MyItems());
        openmct.install(openmct.plugins.LocalTimeSystem());
        openmct.install(openmct.plugins.UTCTimeSystem());

        openmct.on('start', done);

        appHolder = document.createElement("div");
        openmct.start(appHolder);
    });

    afterEach(() => {
        openmct.time.stopClock();
        openmct.router.removeListener('change:hash', resolveFunction);

        appHolder = undefined;
        openmct = undefined;
        resolveFunction = undefined;

        return resetApplicationState(openmct);
    });

    it("initial clock is set to fixed is reflected in URL", (done) => {
        resolveFunction = () => {
            oldHash = window.location.hash;
            expect(window.location.hash).toContain('tc.mode=fixed');

            openmct.router.removeListener('change:hash', resolveFunction);
            done();
        };

        // We have a debounce set to 300ms on setHash, so if we don't flush,
        // the above resolve function sometimes doesn't fire due to a race condition.
        openmct.router.setHash.flush();
        openmct.router.on('change:hash', resolveFunction);
    });

    it("when the clock is set via the time API, it is reflected in the URL", (done) => {
        resolveFunction = () => {
            openmct.time.clock('local', {
                start: -2000,
                end: 200
            });
            openmct.router.setHash.flush();
            const urlHash = window.location.hash;
            expect(urlHash).toContain('tc.startDelta=2000');
            expect(urlHash).toContain('tc.endDelta=200');
            expect(urlHash).toContain('tc.mode=local');
            openmct.router.removeListener('change:hash', resolveFunction);
            done();
        };

        // We have a debounce set to 300ms on setHash, so if we don't flush,
        // the above resolve function sometimes doesn't fire due to a race condition.
        openmct.router.setHash.flush();
        openmct.router.on('change:hash', resolveFunction);
    });

    it("when the clock mode is set to local, it is reflected in the URL", (done) => {
        resolveFunction = () => {
            let hash = window.location.hash;
            hash = hash.replace('tc.mode=fixed', 'tc.mode=local');
            window.location.hash = hash;

            expect(window.location.hash).toContain('tc.mode=local');
            done();
        };

        // We have a debounce set to 300ms on setHash, so if we don't flush,
        // the above resolve function sometimes doesn't fire due to a race condition.
        openmct.router.setHash.flush();
        openmct.router.on('change:hash', resolveFunction);
    });

    it("when the clock mode is set to local, it is reflected in the URL", (done) => {
        resolveFunction = () => {
            let hash = window.location.hash;

            hash = hash.replace('tc.mode=fixed', 'tc.mode=local');
            window.location.hash = hash;
            expect(window.location.hash).toContain('tc.mode=local');
            done();
        };

        // We have a debounce set to 300ms on setHash, so if we don't flush,
        // the above resolve function sometimes doesn't fire due to a race condition.
        openmct.router.setHash.flush();
        openmct.router.on('change:hash', resolveFunction);
    });

    // disabling due to test flakiness
    xit("reset hash", (done) => {
        window.location.hash = oldHash;
        resolveFunction = () => {
            expect(window.location.hash).toBe(oldHash);
            done();
        };

        openmct.router.on('change:hash', resolveFunction);
    });
});
