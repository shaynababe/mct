/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/**
 * @typedef {Object} IndicatorState
 * An object defining the visible state of the indicator.
 * @property {string} statusClass - The class to apply to the indicator.
 * @property {string} text - The text to display in the indicator.
 * @property {string} description - The description to display in the indicator.
 */

/**
 * Set of CouchDB connection states; changes among these states will be
 * reflected in the indicator's appearance.
 * CONNECTED: Everything nominal, expect to be able to read/write.
 * DISCONNECTED: HTTP request failed (network error). Unable to reach server at all.
 * PENDING: Still trying to connect, and haven't failed yet.
 * MAINTENANCE: CouchDB is connected but not accepting requests.
 */

/** @type {IndicatorState} */
export const CONNECTED = {
    statusClass: "s-status-on",
    text: "CouchDB is connected",
    description: "CouchDB is online and accepting requests."
};
/** @type {IndicatorState} */
export const PENDING = {
    statusClass: "s-status-warning-lo",
    text: "Attempting to connect to CouchDB...",
    description: "Checking status of CouchDB, please stand by..."
};
/** @type {IndicatorState} */
export const DISCONNECTED = {
    statusClass: "s-status-warning-hi",
    text: "CouchDB is offline",
    description: "CouchDB is offline and unavailable for requests."
};
/** @type {IndicatorState} */
export const UNKNOWN = {
    statusClass: "s-status-info",
    text: "CouchDB connectivity unknown",
    description: "CouchDB is in an unknown state of connectivity."
};

export default class CouchStatusIndicator {
    constructor(simpleIndicator) {
        this.indicator = simpleIndicator;
        this.#setDefaults();
    }

    /**
     * Set the default values for the indicator.
     * @private
     */
    #setDefaults() {
        this.setIndicatorToState(PENDING);
    }

    /**
     * Set the indicator to the given state.
     * @param {IndicatorState} state
     */
    setIndicatorToState(state) {
        this.indicator.text(state.text);
        this.indicator.description(state.description);
        this.indicator.statusClass(state.statusClass);
    }
}
