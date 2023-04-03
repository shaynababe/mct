/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


class Ticker {
    constructor() {
        this.callbacks = [];
        this.last = new Date() - 1000;
    }

    /**
     * Calls functions every second, as close to the actual second
     * tick as is feasible.
     * @constructor
     * @memberof utils/clock
     */
    tick() {
        const timestamp = new Date();
        const millis = timestamp % 1000;

        // Only update callbacks if a second has actually passed.
        if (timestamp >= this.last + 1000) {
            this.callbacks.forEach(function (callback) {
                callback(timestamp);
            });
            this.last = timestamp - millis;
        }

        // Try to update at exactly the next second
        this.timeoutHandle = setTimeout(() => {
            this.tick();
        }, 1000 - millis, true);
    }

    /**
     * Listen for clock ticks. The provided callback will
     * be invoked with the current timestamp (in milliseconds
     * since Jan 1 1970) at regular intervals, as near to the
     * second boundary as possible.
     *
     * @param {Function} callback callback to invoke
     * @returns {Function} a function to unregister this listener
     */
    listen(callback) {
        if (this.callbacks.length === 0) {
            this.tick();
        }

        this.callbacks.push(callback);

        // Provide immediate feedback
        callback(this.last);

        // Provide a deregistration function
        return () => {
            this.callbacks = this.callbacks.filter(function (cb) {
                return cb !== callback;
            });

            if (this.callbacks.length === 0) {
                clearTimeout(this.timeoutHandle);
            }
        };
    }
}

let ticker = new Ticker();

export default ticker;
