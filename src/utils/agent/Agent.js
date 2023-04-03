/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
/**
 * The query service handles calls for browser and userAgent
* info using a comparison between the userAgent and key
* device names
* @constructor
* @param window the broser object model
* @memberof /utils/agent
*/
export default class Agent {
    constructor(window) {
        const userAgent = window.navigator.userAgent;
        const matches = userAgent.match(/iPad|iPhone|Android/i) || [];

        this.userAgent = userAgent;
        this.mobileName = matches[0];
        this.window = window;
        this.touchEnabled = (window.ontouchstart !== undefined);
    }
    /**
     * Check if the user is on a mobile device.
     * @returns {boolean} true on mobile
     */
    isMobile() {
        return Boolean(this.mobileName);
    }
    /**
     * Check if the user is on a phone-sized mobile device.
     * @returns {boolean} true on a phone
     */
    isPhone() {
        if (this.isMobile()) {
            if (this.isAndroidTablet()) {
                return false;
            } else if (this.mobileName === 'iPad') {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    /**
     * Check if the user is on a tablet sized android device
     * @returns {boolean} true on an android tablet
     */
    isAndroidTablet() {
        if (this.mobileName === 'Android') {
            if (this.isPortrait() && this.window.innerWidth >= 768) {
                return true;
            } else if (this.isLandscape() && this.window.innerHeight >= 768) {
                return true;
            }
        } else {
            return false;
        }
    }
    /**
     * Check if the user is on a tablet-sized mobile device.
     * @returns {boolean} true on a tablet
     */
    isTablet() {
        return (this.isMobile() && !this.isPhone() && this.mobileName !== 'Android') || (this.isMobile() && this.isAndroidTablet());
    }
    /**
     * Check if the user's device is in a portrait-style
     * orientation (display width is narrower than display height.)
     * @returns {boolean} true in portrait mode
     */
    isPortrait() {
        const { screen } = this.window;
        const hasScreenOrientation = screen && Object.prototype.hasOwnProperty.call(screen, 'orientation');
        const hasWindowOrientation = Object.prototype.hasOwnProperty.call(this.window, 'orientation');

        if (hasScreenOrientation) {
            return screen.orientation.type.includes('portrait');
        } else if (hasWindowOrientation) {
            // Use window.orientation API if available (e.g. Safari mobile)
            // which returns [-90, 0, 90, 180] based on device orientation.
            const { orientation } = this.window;

            return Math.abs(orientation / 90) % 2 === 0;
        } else {
            return this.window.innerWidth < this.window.innerHeight;
        }
    }
    /**
     * Check if the user's device is in a landscape-style
     * orientation (display width is greater than display height.)
     * @returns {boolean} true in landscape mode
     */
    isLandscape() {
        return !this.isPortrait();
    }
    /**
     * Check if the user's device supports a touch interface.
     * @returns {boolean} true if touch is supported
     */
    isTouch() {
        return this.touchEnabled;
    }
    /**
     * Check if the user agent matches a certain named device,
     * as indicated by checking for a case-insensitive substring
     * match.
     * @param {string} name the name to check for
     * @returns {boolean} true if the user agent includes that name
     */
    isBrowser(name) {
        name = name.toLowerCase();

        return this.userAgent.toLowerCase().indexOf(name) !== -1;
    }
}
