/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import TimeContext from "./TimeContext";

/**
 * The GlobalContext handles getting and setting time of the openmct application in general.
 * Views will use this context unless they specify an alternate/independent time context
 */
class GlobalTimeContext extends TimeContext {
    constructor() {
        super();

        //The Time Of Interest
        this.toi = undefined;
    }

    /**
     * Get or set the start and end time of the time conductor. Basic validation
     * of bounds is performed.
     *
     * @param {module:openmct.TimeAPI~TimeConductorBounds} newBounds
     * @throws {Error} Validation error
     * @fires module:openmct.TimeAPI~bounds
     * @returns {module:openmct.TimeAPI~TimeConductorBounds}
     * @memberof module:openmct.TimeAPI#
     * @method bounds
     */
    bounds(newBounds) {
        if (arguments.length > 0) {
            super.bounds.call(this, ...arguments);
            // If a bounds change results in a TOI outside of the current
            // bounds, unset it
            if (this.toi < newBounds.start || this.toi > newBounds.end) {
                this.timeOfInterest(undefined);
            }
        }

        //Return a copy to prevent direct mutation of time conductor bounds.
        return JSON.parse(JSON.stringify(this.boundsVal));
    }

    /**
     * Update bounds based on provided time and current offsets
     * @private
     * @param {number} timestamp A time from which bounds will be calculated
     * using current offsets.
     */
    tick(timestamp) {
        super.tick.call(this, ...arguments);

        // If a bounds change results in a TOI outside of the current
        // bounds, unset it
        if (this.toi < this.boundsVal.start || this.toi > this.boundsVal.end) {
            this.timeOfInterest(undefined);
        }
    }

    /**
     * Get or set the Time of Interest. The Time of Interest is a single point
     * in time, and constitutes the temporal focus of application views. It can
     * be manipulated by the user from the time conductor or from other views.
     * The time of interest can effectively be unset by assigning a value of
     * 'undefined'.
     * @fires module:openmct.TimeAPI~timeOfInterest
     * @param newTOI
     * @returns {number} the current time of interest
     * @memberof module:openmct.TimeAPI#
     * @method timeOfInterest
     */
    timeOfInterest(newTOI) {
        if (arguments.length > 0) {
            this.toi = newTOI;
            /**
             * The Time of Interest has moved.
             * @event timeOfInterest
             * @memberof module:openmct.TimeAPI~
             * @property {number} Current time of interest
             */
            this.emit('timeOfInterest', this.toi);
        }

        return this.toi;
    }
}

export default GlobalTimeContext;
