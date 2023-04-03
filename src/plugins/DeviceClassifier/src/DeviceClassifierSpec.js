/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import DeviceClassifier from "./DeviceClassifier";
import DeviceMatchers from "./DeviceMatchers";

const AGENT_METHODS = [
    "isMobile",
    "isPhone",
    "isTablet",
    "isPortrait",
    "isLandscape",
    "isTouch"
];
const TEST_PERMUTATIONS = [
    ["isMobile", "isPhone", "isTouch", "isPortrait"],
    ["isMobile", "isPhone", "isTouch", "isLandscape"],
    ["isMobile", "isTablet", "isTouch", "isPortrait"],
    ["isMobile", "isTablet", "isTouch", "isLandscape"],
    ["isTouch"],
    []
];

describe("DeviceClassifier", function () {
    let mockAgent;
    let mockDocument;
    let mockClassList;

    beforeEach(function () {
        mockAgent = jasmine.createSpyObj(
            "agent",
            AGENT_METHODS
        );

        mockClassList = jasmine.createSpyObj("classList", ["add"]);

        mockDocument = jasmine.createSpyObj(
            "document",
            {},
            { body: { classList: mockClassList } }
        );

        AGENT_METHODS.forEach(function (m) {
            mockAgent[m].and.returnValue(false);
        });
    });

    TEST_PERMUTATIONS.forEach(function (trueMethods) {
        const summary =
      trueMethods.length === 0
          ? "device has no detected characteristics"
          : "device " + trueMethods.join(", ");

        describe("when " + summary, function () {
            beforeEach(function () {
                trueMethods.forEach(function (m) {
                    mockAgent[m].and.returnValue(true);
                });

                // eslint-disable-next-line no-new
                DeviceClassifier(mockAgent, mockDocument);
            });

            it("adds classes for matching, detected characteristics", function () {
                Object.keys(DeviceMatchers)
                    .filter(function (m) {
                        return DeviceMatchers[m](mockAgent);
                    })
                    .forEach(function (key) {
                        expect(mockDocument.body.classList.add).toHaveBeenCalledWith(key);
                    });
            });

            it("does not add classes for non-matching characteristics", function () {
                Object.keys(DeviceMatchers)
                    .filter(function (m) {
                        return !DeviceMatchers[m](mockAgent);
                    })
                    .forEach(function (key) {
                        expect(mockDocument.body.classList.add).not.toHaveBeenCalledWith(
                            key
                        );
                    });
            });
        });
    });
});
