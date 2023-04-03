/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
 * Runs at application startup and adds a subset of the following
 * CSS classes to the body of the document, depending on device
 * attributes:
 *
 * * `mobile`: Phones or tablets.
 * * `phone`: Phones specifically.
 * * `tablet`: Tablets specifically.
 * * `desktop`: Non-mobile devices.
 * * `portrait`: Devices in a portrait-style orientation.
 * * `landscape`: Devices in a landscape-style orientation.
 * * `touch`: Device supports touch events.
 *
 * @param {utils/agent/Agent} agent
 *        the service used to examine the user agent
 * @param document the HTML DOM document object
 * @constructor
 */
import DeviceMatchers from "./DeviceMatchers";

export default (agent, document) => {
    const body = document.body;

    Object.keys(DeviceMatchers).forEach((key, index, array) => {
        if (DeviceMatchers[key](agent)) {
            body.classList.add(key);
        }
    });

    if (agent.isMobile()) {
        const mediaQuery = window.matchMedia("(orientation: landscape)");
        function eventHandler(event) {
            if (event.matches) {
                body.classList.remove("portrait");
                body.classList.add("landscape");
            } else {
                body.classList.remove("landscape");
                body.classList.add("portrait");
            }
        }

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener(`change`, eventHandler);
        } else {
            // Deprecated 'MediaQueryList' API, <Safari 14, IE, <Edge 16
            mediaQuery.addListener(eventHandler);
        }
    }
};
