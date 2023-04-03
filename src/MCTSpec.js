/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './plugins/plugins',
    'utils/testing'
], function (plugins, testUtils) {
    describe("MCT", function () {
        let openmct;
        let mockPlugin;
        let mockPlugin2;
        let mockListener;

        beforeEach(function () {
            mockPlugin = jasmine.createSpy('plugin');
            mockPlugin2 = jasmine.createSpy('plugin2');
            mockListener = jasmine.createSpy('listener');

            openmct = testUtils.createOpenMct();

            openmct.install(mockPlugin);
            openmct.install(mockPlugin2);
            openmct.on('start', mockListener);
        });

        // Clean up the dirty singleton.
        afterEach(function () {
            return testUtils.resetApplicationState(openmct);
        });

        it("exposes plugins", function () {
            expect(openmct.plugins).toEqual(plugins);
        });

        it("does not issue a start event before started", function () {
            expect(mockListener).not.toHaveBeenCalled();
        });

        describe("start", function () {
            let appHolder;
            beforeEach(function (done) {
                appHolder = document.createElement("div");
                openmct.on('start', done);
                openmct.start(appHolder);
            });

            it("calls plugins for configuration", function () {
                expect(mockPlugin).toHaveBeenCalledWith(openmct);
                expect(mockPlugin2).toHaveBeenCalledWith(openmct);
            });

            it("emits a start event", function () {
                expect(mockListener).toHaveBeenCalled();
            });

            it("Renders the application into the provided container element", function () {
                let openMctShellElements = appHolder.querySelectorAll('div.l-shell');
                expect(openMctShellElements.length).toBe(1);
            });
        });

        describe("startHeadless", function () {
            beforeEach(function (done) {
                openmct.on('start', done);
                openmct.startHeadless();
            });

            it("calls plugins for configuration", function () {
                expect(mockPlugin).toHaveBeenCalledWith(openmct);
                expect(mockPlugin2).toHaveBeenCalledWith(openmct);
            });

            it("emits a start event", function () {
                expect(mockListener).toHaveBeenCalled();
            });

            it("Does not render Open MCT", function () {
                let openMctShellElements = document.body.querySelectorAll('div.l-shell');
                expect(openMctShellElements.length).toBe(0);
            });
        });

        describe("setAssetPath", function () {
            let testAssetPath;

            it("configures the path for assets", function () {
                testAssetPath = "some/path/";
                openmct.setAssetPath(testAssetPath);
                expect(openmct.getAssetPath()).toBe(testAssetPath);
            });

            it("adds a trailing /", function () {
                testAssetPath = "some/path";
                openmct.setAssetPath(testAssetPath);
                expect(openmct.getAssetPath()).toBe(testAssetPath + "/");
            });
        });
    });
});
