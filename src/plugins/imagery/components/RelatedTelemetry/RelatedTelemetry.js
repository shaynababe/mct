/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

function copyRelatedMetadata(metadata) {
    let compare = metadata.comparisonFunction;
    let copiedMetadata = JSON.parse(JSON.stringify(metadata));
    copiedMetadata.comparisonFunction = compare;

    return copiedMetadata;
}

import IndependentTimeContext from "@/api/time/IndependentTimeContext";
export default class RelatedTelemetry {

    constructor(openmct, domainObject, telemetryKeys) {
        this._openmct = openmct;
        this._domainObject = domainObject;

        let metadata = this._openmct.telemetry.getMetadata(this._domainObject);
        let imageHints = metadata.valuesForHints(['image'])[0];

        this.hasRelatedTelemetry = imageHints.relatedTelemetry !== undefined;

        if (this.hasRelatedTelemetry) {
            this.keys = telemetryKeys;

            this._timeFormatter = undefined;
            this._timeSystemChange(this._openmct.time.timeSystem());

            // grab related telemetry metadata
            for (let key of this.keys) {
                if (imageHints.relatedTelemetry[key]) {
                    this[key] = copyRelatedMetadata(imageHints.relatedTelemetry[key]);
                }
            }

            this.load = this.load.bind(this);
            this._parseTime = this._parseTime.bind(this);
            this._timeSystemChange = this._timeSystemChange.bind(this);
            this.destroy = this.destroy.bind(this);

            this._openmct.time.on('timeSystem', this._timeSystemChange);
        }
    }

    async load() {
        if (!this.hasRelatedTelemetry) {
            throw new Error('This domain object does not have related telemetry, use "hasRelatedTelemetry" to check before loading.');
        }

        await Promise.all(
            this.keys.map(async (key) => {
                if (this[key]) {
                    if (this[key].historical) {
                        await this._initializeHistorical(key);
                    }

                    if (this[key].realtime && this[key].realtime.telemetryObjectId && this[key].realtime.telemetryObjectId !== '') {
                        await this._intializeRealtime(key);
                    }
                }
            })
        );
    }

    async _initializeHistorical(key) {
        if (!this[key].historical.telemetryObjectId) {
            this[key].historical.hasTelemetryOnDatum = true;
        } else if (this[key].historical.telemetryObjectId !== '') {
            this[key].historicalDomainObject = await this._openmct.objects.get(this[key].historical.telemetryObjectId);

            this[key].requestLatestFor = async (datum) => {
                // We need to create a throwaway time context and pass it along
                // as a request option. We do this to "trick" the Time API
                // into thinking we are in fixed time mode in order to bypass this logic:
                // https://github.com/akhenry/openmct-yamcs/blob/1060d42ebe43bf346dac0f6a8068cb288ade4ba4/src/providers/historical-telemetry-provider.js#L59
                // Context: https://github.com/akhenry/openmct-yamcs/pull/217
                const ephemeralContext = new IndependentTimeContext(
                    this._openmct,
                    this._openmct.time,
                    [this[key].historicalDomainObject]
                );

                // Stop following the global context, stop the clock,
                // and set bounds.
                ephemeralContext.resetContext();
                const newBounds = {
                    start: this._openmct.time.bounds().start,
                    end: this._parseTime(datum)
                };
                ephemeralContext.stopClock();
                ephemeralContext.bounds(newBounds);

                const options = {
                    start: newBounds.start,
                    end: newBounds.end,
                    timeContext: ephemeralContext,
                    strategy: 'latest'
                };
                let results = await this._openmct.telemetry
                    .request(this[key].historicalDomainObject, options);

                return results[results.length - 1];
            };
        }
    }

    async _intializeRealtime(key) {
        this[key].realtimeDomainObject = await this._openmct.objects.get(this[key].realtime.telemetryObjectId);
        this[key].listeners = [];
        this[key].subscribe = (callback) => {

            if (!this[key].isSubscribed) {
                this._subscribeToDataForKey(key);
            }

            if (!this[key].listeners.includes(callback)) {
                this[key].listeners.push(callback);

                return () => {
                    this[key].listeners.remove(callback);
                };
            } else {
                return () => {};
            }
        };
    }

    _subscribeToDataForKey(key) {
        if (this[key].isSubscribed) {
            return;
        }

        if (this[key].realtimeDomainObject) {
            this[key].unsubscribe = this._openmct.telemetry.subscribe(
                this[key].realtimeDomainObject, datum => {
                    this[key].listeners.forEach(callback => {
                        callback(datum);
                    });

                }
            );

            this[key].isSubscribed = true;
        }
    }

    _parseTime(datum) {
        return this._timeFormatter.parse(datum);
    }

    _timeSystemChange(system) {
        let key = system.key;
        let metadata = this._openmct.telemetry.getMetadata(this._domainObject);
        let metadataValue = metadata.value(key) || { format: key };
        this._timeFormatter = this._openmct.telemetry.getValueFormatter(metadataValue);
    }

    destroy() {
        this._openmct.time.off('timeSystem', this._timeSystemChange);
        for (let key of this.keys) {
            if (this[key] && this[key].unsubscribe) {
                this[key].unsubscribe();
            }
        }
    }

}
