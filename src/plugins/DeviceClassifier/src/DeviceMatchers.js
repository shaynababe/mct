/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
 * An object containing key-value pairs, where keys are symbolic of
 * device attributes, and values are functions that take the
 * `agent` as inputs and return boolean values indicating
 * whether or not the current device has these attributes.
 *
 * For internal use by the mobile support bundle.
 *
 * @memberof src/plugins/DeviceClassifier
 * @private
 */

export default {
    mobile: function (agent) {
        return agent.isMobile();
    },
    phone: function (agent) {
        return agent.isPhone();
    },
    tablet: function (agent) {
        return agent.isTablet();
    },
    desktop: function (agent) {
        return !agent.isMobile();
    },
    portrait: function (agent) {
        return agent.isPortrait();
    },
    landscape: function (agent) {
        return agent.isLandscape();
    },
    touch: function (agent) {
        return agent.isTouch();
    }
};
