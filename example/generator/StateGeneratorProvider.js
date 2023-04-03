/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([

], function (

) {

    function StateGeneratorProvider() {

    }

    function pointForTimestamp(timestamp, duration, name) {
        return {
            name: name,
            utc: Math.floor(timestamp / duration) * duration,
            value: Math.floor(timestamp / duration) % 2
        };
    }

    StateGeneratorProvider.prototype.supportsSubscribe = function (domainObject) {
        return domainObject.type === 'example.state-generator';
    };

    StateGeneratorProvider.prototype.subscribe = function (domainObject, callback) {
        var duration = domainObject.telemetry.duration * 1000;

        var interval = setInterval(function () {
            var now = Date.now();
            var datum = pointForTimestamp(now, duration, domainObject.name);
            datum.value = String(datum.value);
            callback(datum);
        }, duration);

        return function () {
            clearInterval(interval);
        };
    };

    StateGeneratorProvider.prototype.supportsRequest = function (domainObject, options) {
        return domainObject.type === 'example.state-generator';
    };

    StateGeneratorProvider.prototype.request = function (domainObject, options) {
        var start = options.start;
        var end = Math.min(Date.now(), options.end); // no future values
        var duration = domainObject.telemetry.duration * 1000;
        if (options.strategy === 'latest' || options.size === 1) {
            start = end;
        }

        var data = [];
        while (start <= end && data.length < 5000) {
            data.push(pointForTimestamp(start, duration, domainObject.name));
            start += duration;
        }

        return Promise.resolve(data);
    };

    return StateGeneratorProvider;

});
