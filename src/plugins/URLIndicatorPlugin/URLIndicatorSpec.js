/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define(
    [
        "utils/testing",
        "./URLIndicator",
        "./URLIndicatorPlugin",
        "../../MCT"
    ],
    function (
        testingUtils,
        URLIndicator,
        URLIndicatorPlugin,
        MCT
    ) {
        describe("The URLIndicator", function () {
            let openmct;
            let indicatorElement;
            let pluginOptions;
            let urlIndicator; // eslint-disable-line
            let fetchSpy;

            beforeEach(function () {
                jasmine.clock().install();
                openmct = new testingUtils.createOpenMct();
                spyOn(openmct.indicators, 'add');
                fetchSpy = spyOn(window, 'fetch').and.callFake(() => Promise.resolve({
                    ok: true
                }));
            });

            afterEach(function () {
                if (window.fetch.restore) {
                    window.fetch.restore();
                }

                jasmine.clock().uninstall();

                return testingUtils.resetApplicationState(openmct);
            });

            describe("on initialization", function () {
                describe("with default options", function () {
                    beforeEach(function () {
                        pluginOptions = {
                            url: "someURL"
                        };
                        urlIndicator = URLIndicatorPlugin(pluginOptions)(openmct);
                        indicatorElement = openmct.indicators.add.calls.mostRecent().args[0].element;
                    });

                    it("has a default icon class if none supplied", function () {
                        expect(indicatorElement.classList.contains('icon-chain-links')).toBe(true);
                    });

                    it("defaults to the URL if no label supplied", function () {
                        expect(indicatorElement.textContent.indexOf(pluginOptions.url) >= 0).toBe(true);
                    });
                });

                describe("with custom options", function () {
                    beforeEach(function () {
                        pluginOptions = {
                            url: "customURL",
                            interval: 1814,
                            iconClass: "iconClass-checked",
                            label: "custom label"
                        };
                        urlIndicator = URLIndicatorPlugin(pluginOptions)(openmct);
                        indicatorElement = openmct.indicators.add.calls.mostRecent().args[0].element;
                    });

                    it("uses the custom iconClass", function () {
                        expect(indicatorElement.classList.contains('iconClass-checked')).toBe(true);
                    });
                    it("uses custom interval", function () {
                        expect(window.fetch).toHaveBeenCalledTimes(1);
                        jasmine.clock().tick(1);
                        expect(window.fetch).toHaveBeenCalledTimes(1);
                        jasmine.clock().tick(pluginOptions.interval + 1);
                        expect(window.fetch).toHaveBeenCalledTimes(2);
                    });
                    it("uses custom label if supplied in initialization", function () {
                        expect(indicatorElement.textContent.indexOf(pluginOptions.label) >= 0).toBe(true);
                    });
                });
            });

            describe("when running", function () {
                beforeEach(function () {
                    pluginOptions = {
                        url: "someURL",
                        interval: 100
                    };
                    urlIndicator = URLIndicatorPlugin(pluginOptions)(openmct);
                    indicatorElement = openmct.indicators.add.calls.mostRecent().args[0].element;
                });

                it("requests the provided URL", function () {
                    jasmine.clock().tick(pluginOptions.interval + 1);
                    expect(window.fetch).toHaveBeenCalledWith(pluginOptions.url);
                });

                it("indicates success if connection is nominal", async function () {
                    jasmine.clock().tick(pluginOptions.interval + 1);
                    await urlIndicator.fetchUrl();
                    expect(indicatorElement.classList.contains('s-status-on')).toBe(true);
                });

                it("indicates an error when the server cannot be reached", async function () {
                    fetchSpy.and.callFake(() => Promise.resolve({
                        ok: false
                    }));
                    jasmine.clock().tick(pluginOptions.interval + 1);
                    await urlIndicator.fetchUrl();
                    expect(indicatorElement.classList.contains('s-status-warning-hi')).toBe(true);
                });
            });
        });
    }
);
