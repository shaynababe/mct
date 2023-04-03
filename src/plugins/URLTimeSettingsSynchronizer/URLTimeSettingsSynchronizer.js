/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

const TIME_EVENTS = ['timeSystem', 'clock', 'clockOffsets'];
const SEARCH_MODE = 'tc.mode';
const SEARCH_TIME_SYSTEM = 'tc.timeSystem';
const SEARCH_START_BOUND = 'tc.startBound';
const SEARCH_END_BOUND = 'tc.endBound';
const SEARCH_START_DELTA = 'tc.startDelta';
const SEARCH_END_DELTA = 'tc.endDelta';
const MODE_FIXED = 'fixed';

export default class URLTimeSettingsSynchronizer {
    constructor(openmct) {
        this.openmct = openmct;
        this.isUrlUpdateInProgress = false;

        this.initialize = this.initialize.bind(this);
        this.destroy = this.destroy.bind(this);
        this.updateTimeSettings = this.updateTimeSettings.bind(this);
        this.setUrlFromTimeApi = this.setUrlFromTimeApi.bind(this);
        this.updateBounds = this.updateBounds.bind(this);

        openmct.on('start', this.initialize);
        openmct.on('destroy', this.destroy);
    }

    initialize() {
        this.updateTimeSettings();
        this.openmct.router.on('change:params', this.updateTimeSettings);

        TIME_EVENTS.forEach(event => {
            this.openmct.time.on(event, this.setUrlFromTimeApi);
        });
        this.openmct.time.on('bounds', this.updateBounds);
    }

    destroy() {
        this.openmct.router.off('change:params', this.updateTimeSettings);

        this.openmct.off('start', this.initialize);
        this.openmct.off('destroy', this.destroy);

        TIME_EVENTS.forEach(event => {
            this.openmct.time.off(event, this.setUrlFromTimeApi);
        });
        this.openmct.time.off('bounds', this.updateBounds);
    }

    updateTimeSettings() {
        let timeParameters = this.parseParametersFromUrl();

        if (this.areTimeParametersValid(timeParameters)) {
            this.setTimeApiFromUrl(timeParameters);
            this.openmct.router.setLocationFromUrl();
        } else {
            this.setUrlFromTimeApi();
        }
    }

    parseParametersFromUrl() {
        let searchParams = this.openmct.router.getAllSearchParams();

        let mode = searchParams.get(SEARCH_MODE);
        let timeSystem = searchParams.get(SEARCH_TIME_SYSTEM);

        let startBound = parseInt(searchParams.get(SEARCH_START_BOUND), 10);
        let endBound = parseInt(searchParams.get(SEARCH_END_BOUND), 10);
        let bounds = {
            start: startBound,
            end: endBound
        };

        let startOffset = parseInt(searchParams.get(SEARCH_START_DELTA), 10);
        let endOffset = parseInt(searchParams.get(SEARCH_END_DELTA), 10);
        let clockOffsets = {
            start: 0 - startOffset,
            end: endOffset
        };

        return {
            mode,
            timeSystem,
            bounds,
            clockOffsets
        };
    }

    setTimeApiFromUrl(timeParameters) {
        if (timeParameters.mode === 'fixed') {
            if (this.openmct.time.timeSystem().key !== timeParameters.timeSystem) {
                this.openmct.time.timeSystem(
                    timeParameters.timeSystem,
                    timeParameters.bounds
                );
            } else if (!this.areStartAndEndEqual(this.openmct.time.bounds(), timeParameters.bounds)) {
                this.openmct.time.bounds(timeParameters.bounds);
            }

            if (this.openmct.time.clock()) {
                this.openmct.time.stopClock();
            }
        } else {
            if (!this.openmct.time.clock()
                || this.openmct.time.clock().key !== timeParameters.mode) {
                this.openmct.time.clock(timeParameters.mode, timeParameters.clockOffsets);
            } else if (!this.areStartAndEndEqual(this.openmct.time.clockOffsets(), timeParameters.clockOffsets)) {
                this.openmct.time.clockOffsets(timeParameters.clockOffsets);
            }

            if (!this.openmct.time.timeSystem()
                || this.openmct.time.timeSystem().key !== timeParameters.timeSystem) {
                this.openmct.time.timeSystem(timeParameters.timeSystem);
            }
        }
    }

    updateBounds(bounds, isTick) {
        if (!isTick) {
            this.setUrlFromTimeApi();
        }
    }

    setUrlFromTimeApi() {
        let searchParams = this.openmct.router.getAllSearchParams();
        let clock = this.openmct.time.clock();
        let bounds = this.openmct.time.bounds();
        let clockOffsets = this.openmct.time.clockOffsets();

        if (clock === undefined) {
            searchParams.set(SEARCH_MODE, MODE_FIXED);
            searchParams.set(SEARCH_START_BOUND, bounds.start);
            searchParams.set(SEARCH_END_BOUND, bounds.end);

            searchParams.delete(SEARCH_START_DELTA);
            searchParams.delete(SEARCH_END_DELTA);
        } else {
            searchParams.set(SEARCH_MODE, clock.key);

            if (clockOffsets !== undefined) {
                searchParams.set(SEARCH_START_DELTA, 0 - clockOffsets.start);
                searchParams.set(SEARCH_END_DELTA, clockOffsets.end);
            } else {
                searchParams.delete(SEARCH_START_DELTA);
                searchParams.delete(SEARCH_END_DELTA);
            }

            searchParams.delete(SEARCH_START_BOUND);
            searchParams.delete(SEARCH_END_BOUND);
        }

        searchParams.set(SEARCH_TIME_SYSTEM, this.openmct.time.timeSystem().key);
        this.openmct.router.setAllSearchParams(searchParams);
    }

    areTimeParametersValid(timeParameters) {
        let isValid = false;

        if (this.isModeValid(timeParameters.mode)
            && this.isTimeSystemValid(timeParameters.timeSystem)) {

            if (timeParameters.mode === 'fixed') {
                isValid = this.areStartAndEndValid(timeParameters.bounds);
            } else {
                isValid = this.areStartAndEndValid(timeParameters.clockOffsets);
            }
        }

        return isValid;
    }

    areStartAndEndValid(bounds) {
        return bounds !== undefined
            && bounds.start !== undefined
            && bounds.start !== null
            && bounds.end !== undefined
            && bounds.start !== null
            && !isNaN(bounds.start)
            && !isNaN(bounds.end);
    }

    isTimeSystemValid(timeSystem) {
        let isValid = timeSystem !== undefined;
        if (isValid) {
            let timeSystemObject = this.openmct.time.timeSystems.get(timeSystem);
            isValid = timeSystemObject !== undefined;
        }

        return isValid;
    }

    isModeValid(mode) {
        let isValid = false;

        if (mode !== undefined
            && mode !== null) {
            isValid = true;
        }

        if (isValid) {
            if (mode.toLowerCase() === MODE_FIXED) {
                isValid = true;
            } else {
                isValid = this.openmct.time.clocks.get(mode) !== undefined;
            }
        }

        return isValid;
    }

    areStartAndEndEqual(firstBounds, secondBounds) {
        return firstBounds.start === secondBounds.start
            && firstBounds.end === secondBounds.end;
    }
}
