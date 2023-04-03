/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './WorkerInterface'
], function (
    WorkerInterface
) {

    var REQUEST_DEFAULTS = {
        amplitude: 1,
        period: 10,
        offset: 0,
        dataRateInHz: 1,
        randomness: 0,
        phase: 0,
        loadDelay: 0,
        infinityValues: false
    };

    function GeneratorProvider(openmct, StalenessProvider) {
        this.openmct = openmct;
        this.workerInterface = new WorkerInterface(openmct, StalenessProvider);
    }

    GeneratorProvider.prototype.canProvideTelemetry = function (domainObject) {
        return domainObject.type === 'generator';
    };

    GeneratorProvider.prototype.supportsRequest =
        GeneratorProvider.prototype.supportsSubscribe =
            GeneratorProvider.prototype.canProvideTelemetry;

    GeneratorProvider.prototype.makeWorkerRequest = function (domainObject, request) {
        var props = [
            'amplitude',
            'period',
            'offset',
            'dataRateInHz',
            'randomness',
            'phase',
            'loadDelay',
            'infinityValues'
        ];

        request = request || {};

        var workerRequest = {};

        props.forEach(function (prop) {
            if (domainObject.telemetry && Object.prototype.hasOwnProperty.call(domainObject.telemetry, prop)) {
                workerRequest[prop] = domainObject.telemetry[prop];
            }

            if (request && Object.prototype.hasOwnProperty.call(request, prop)) {
                workerRequest[prop] = request[prop];
            }

            if (!Object.prototype.hasOwnProperty.call(workerRequest, prop)) {
                workerRequest[prop] = REQUEST_DEFAULTS[prop];
            }

            workerRequest[prop] = Number(workerRequest[prop]);
        });

        workerRequest.id = this.openmct.objects.makeKeyString(domainObject.identifier);
        workerRequest.name = domainObject.name;

        return workerRequest;
    };

    GeneratorProvider.prototype.request = function (domainObject, request) {
        var workerRequest = this.makeWorkerRequest(domainObject, request);
        workerRequest.start = request.start;
        workerRequest.end = request.end;

        return this.workerInterface.request(workerRequest);
    };

    GeneratorProvider.prototype.subscribe = function (domainObject, callback) {
        var workerRequest = this.makeWorkerRequest(domainObject, {});

        return this.workerInterface.subscribe(workerRequest, callback);
    };

    return GeneratorProvider;
});
