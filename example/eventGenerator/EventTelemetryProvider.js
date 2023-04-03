/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/**
 * Module defining EventTelemetryProvider. Created by chacskaylo on 06/18/2015.
 */

import messages from './transcript.json';

class EventTelemetryProvider {
    constructor() {
        this.defaultSize = 25;
    }

    generateData(firstObservedTime, count, startTime, duration, name) {
        const millisecondsSinceStart = startTime - firstObservedTime;
        const utc = startTime + (count * duration);
        const ind = count % messages.length;
        const message = messages[ind] + " - [" + millisecondsSinceStart + "]";

        return {
            name,
            utc,
            message
        };
    }

    supportsRequest(domainObject) {
        return domainObject.type === 'eventGenerator';
    }

    supportsSubscribe(domainObject) {
        return domainObject.type === 'eventGenerator';
    }

    subscribe(domainObject, callback) {
        const duration = domainObject.telemetry.duration * 1000;
        const firstObservedTime = Date.now();
        let count = 0;

        const interval = setInterval(() => {
            const startTime = Date.now();
            const datum = this.generateData(firstObservedTime, count, startTime, duration, domainObject.name);
            count += 1;
            callback(datum);
        }, duration);

        return function () {
            clearInterval(interval);
        };
    }

    request(domainObject, options) {
        let start = options.start;
        const end = Math.min(Date.now(), options.end); // no future values
        const duration = domainObject.telemetry.duration * 1000;
        const size = options.size ? options.size : this.defaultSize;
        const data = [];
        const firstObservedTime = options.start;
        let count = 0;

        if (options.strategy === 'latest' || options.size === 1) {
            start = end;
        }

        while (start <= end && data.length < size) {
            const startTime = options.start + count;
            data.push(this.generateData(firstObservedTime, count, startTime, duration, domainObject.name));
            start += duration;
            count += 1;
        }

        return Promise.resolve(data);
    }
}

export default EventTelemetryProvider;
