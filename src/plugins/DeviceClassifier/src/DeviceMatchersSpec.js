/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import DeviceMatchers from "./DeviceMatchers";

describe("DeviceMatchers", function () {
    let mockAgent;

    beforeEach(function () {
        mockAgent = jasmine.createSpyObj("agent", [
            "isMobile",
            "isPhone",
            "isTablet",
            "isPortrait",
            "isLandscape",
            "isTouch"
        ]);
    });

    it("detects when a device is a desktop device", function () {
        mockAgent.isMobile.and.returnValue(false);
        expect(DeviceMatchers.desktop(mockAgent)).toBe(true);
        mockAgent.isMobile.and.returnValue(true);
        expect(DeviceMatchers.desktop(mockAgent)).toBe(false);
    });

    function method(deviceType) {
        return "is" + deviceType[0].toUpperCase() + deviceType.slice(1);
    }

    [
        "mobile",
        "phone",
        "tablet",
        "landscape",
        "portrait",
        "landscape",
        "touch"
    ].forEach(function (deviceType) {
        it("detects when a device is a " + deviceType + " device", function () {
            mockAgent[method(deviceType)].and.returnValue(true);
            expect(DeviceMatchers[deviceType](mockAgent)).toBe(true);
            mockAgent[method(deviceType)].and.returnValue(false);
            expect(DeviceMatchers[deviceType](mockAgent)).toBe(false);
        });
    });
});
