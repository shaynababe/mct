/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    'objectUtils',
    './TelemetryAverager'
], function (objectUtils, TelemetryAverager) {

    function MeanTelemetryProvider(openmct) {
        this.openmct = openmct;
        this.telemetryAPI = openmct.telemetry;
        this.timeAPI = openmct.time;
        this.objectAPI = openmct.objects;
        this.perObjectProviders = {};
    }

    MeanTelemetryProvider.prototype.canProvideTelemetry = function (domainObject) {
        return domainObject.type === 'telemetry-mean';
    };

    MeanTelemetryProvider.prototype.supportsRequest =
        MeanTelemetryProvider.prototype.supportsSubscribe =
            MeanTelemetryProvider.prototype.canProvideTelemetry;

    MeanTelemetryProvider.prototype.subscribe = function (domainObject, callback) {
        let wrappedUnsubscribe;
        let unsubscribeCalled = false;
        const objectId = objectUtils.parseKeyString(domainObject.telemetryPoint);
        const samples = domainObject.samples;

        this.objectAPI.get(objectId)
            .then(function (linkedDomainObject) {
                if (!unsubscribeCalled) {
                    wrappedUnsubscribe = this.subscribeToAverage(linkedDomainObject, samples, callback);
                }
            }.bind(this))
            .catch(logError);

        return function unsubscribe() {
            unsubscribeCalled = true;
            if (wrappedUnsubscribe !== undefined) {
                wrappedUnsubscribe();
            }
        };
    };

    MeanTelemetryProvider.prototype.subscribeToAverage = function (domainObject, samples, callback) {
        const telemetryAverager = new TelemetryAverager(this.telemetryAPI, this.timeAPI, domainObject, samples, callback);
        const createAverageDatum = telemetryAverager.createAverageDatum.bind(telemetryAverager);

        return this.telemetryAPI.subscribe(domainObject, createAverageDatum);
    };

    MeanTelemetryProvider.prototype.request = function (domainObject, request) {
        const objectId = objectUtils.parseKeyString(domainObject.telemetryPoint);
        const samples = domainObject.samples;

        return this.objectAPI.get(objectId).then(function (linkedDomainObject) {
            return this.requestAverageTelemetry(linkedDomainObject, request, samples);
        }.bind(this));
    };

    /**
     * @private
     */
    MeanTelemetryProvider.prototype.requestAverageTelemetry = function (domainObject, request, samples) {
        const averageData = [];
        const addToAverageData = averageData.push.bind(averageData);
        const telemetryAverager = new TelemetryAverager(this.telemetryAPI, this.timeAPI, domainObject, samples, addToAverageData);
        const createAverageDatum = telemetryAverager.createAverageDatum.bind(telemetryAverager);

        return this.telemetryAPI.request(domainObject, request).then(function (telemetryData) {
            telemetryData.forEach(createAverageDatum);

            return averageData;
        });
    };

    /**
     * @private
     */
    MeanTelemetryProvider.prototype.getLinkedObject = function (domainObject) {
        const objectId = objectUtils.parseKeyString(domainObject.telemetryPoint);

        return this.objectAPI.get(objectId);
    };

    function logError(error) {
        if (error.stack) {
            console.error(error.stack);
        } else {
            console.error(error);
        }
    }

    return MeanTelemetryProvider;
});
