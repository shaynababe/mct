/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import Agent from "./Agent";

const TEST_USER_AGENTS = {
    DESKTOP:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36",
    IPAD:
    "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53",
    IPHONE:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"
};

describe("The Agent", function () {
    let testWindow;
    let agent;

    beforeEach(function () {
        testWindow = {
            innerWidth: 640,
            innerHeight: 480,
            navigator: {
                userAgent: TEST_USER_AGENTS.DESKTOP
            }
        };
    });

    it("recognizes desktop devices as non-mobile", function () {
        testWindow.navigator.userAgent = TEST_USER_AGENTS.DESKTOP;
        agent = new Agent(testWindow);
        expect(agent.isMobile()).toBeFalsy();
        expect(agent.isPhone()).toBeFalsy();
        expect(agent.isTablet()).toBeFalsy();
    });

    it("detects iPhones", function () {
        testWindow.navigator.userAgent = TEST_USER_AGENTS.IPHONE;
        agent = new Agent(testWindow);
        expect(agent.isMobile()).toBeTruthy();
        expect(agent.isPhone()).toBeTruthy();
        expect(agent.isTablet()).toBeFalsy();
    });

    it("detects iPads", function () {
        testWindow.navigator.userAgent = TEST_USER_AGENTS.IPAD;
        agent = new Agent(testWindow);
        expect(agent.isMobile()).toBeTruthy();
        expect(agent.isPhone()).toBeFalsy();
        expect(agent.isTablet()).toBeTruthy();
    });

    it("detects display orientation by innerHeight and innerWidth", function () {
        agent = new Agent(testWindow);
        testWindow.innerWidth = 1024;
        testWindow.innerHeight = 400;
        expect(agent.isPortrait()).toBeFalsy();
        expect(agent.isLandscape()).toBeTruthy();
        testWindow.innerWidth = 400;
        testWindow.innerHeight = 1024;
        expect(agent.isPortrait()).toBeTruthy();
        expect(agent.isLandscape()).toBeFalsy();
    });

    it("detects display orientation by screen.orientation", function () {
        agent = new Agent(testWindow);
        testWindow.screen = {
            orientation: {
                type: "landscape-primary"
            }
        };
        expect(agent.isPortrait()).toBeFalsy();
        expect(agent.isLandscape()).toBeTruthy();
        testWindow.screen = {
            orientation: {
                type: "portrait-primary"
            }
        };
        expect(agent.isPortrait()).toBeTruthy();
        expect(agent.isLandscape()).toBeFalsy();
    });

    it("detects display orientation by window.orientation", function () {
        agent = new Agent(testWindow);
        testWindow.orientation = 90;
        expect(agent.isPortrait()).toBeFalsy();
        expect(agent.isLandscape()).toBeTruthy();
        testWindow.orientation = 0;
        expect(agent.isPortrait()).toBeTruthy();
        expect(agent.isLandscape()).toBeFalsy();
    });

    it("detects touch support", function () {
        testWindow.ontouchstart = null;
        expect(new Agent(testWindow).isTouch()).toBe(true);
        delete testWindow.ontouchstart;
        expect(new Agent(testWindow).isTouch()).toBe(false);
    });

    it("allows for checking browser type", function () {
        testWindow.navigator.userAgent = "Chromezilla Safarifox";
        agent = new Agent(testWindow);
        expect(agent.isBrowser("Chrome")).toBe(true);
        expect(agent.isBrowser("Firefox")).toBe(false);
    });
});
