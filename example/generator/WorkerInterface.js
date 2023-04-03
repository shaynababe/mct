/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    'uuid'
], function (
    { v4: uuid }
) {
    function WorkerInterface(openmct, StalenessProvider) {
        // eslint-disable-next-line no-undef
        const workerUrl = `${openmct.getAssetPath()}${__OPENMCT_ROOT_RELATIVE__}generatorWorker.js`;
        this.StalenessProvider = StalenessProvider;
        this.worker = new Worker(workerUrl);
        this.worker.onmessage = this.onMessage.bind(this);
        this.callbacks = {};
        this.staleTelemetryIds = {};

        this.watchStaleness();
    }

    WorkerInterface.prototype.watchStaleness = function () {
        this.StalenessProvider.on('stalenessEvent', ({ id, isStale}) => {
            this.staleTelemetryIds[id] = isStale;
        });
    };

    WorkerInterface.prototype.onMessage = function (message) {
        message = message.data;
        var callback = this.callbacks[message.id];
        if (callback) {
            callback(message);
        }
    };

    WorkerInterface.prototype.dispatch = function (request, data, callback) {
        var message = {
            request: request,
            data: data,
            id: uuid()
        };

        if (callback) {
            this.callbacks[message.id] = callback;
        }

        this.worker.postMessage(message);

        return message.id;
    };

    WorkerInterface.prototype.request = function (request) {
        var deferred = {};
        var promise = new Promise(function (resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        var messageId;

        let self = this;
        function callback(message) {
            if (message.error) {
                deferred.reject(message.error);
            } else {
                deferred.resolve(message.data);
            }

            delete self.callbacks[messageId];

        }

        messageId = this.dispatch('request', request, callback.bind(this));

        return promise;
    };

    WorkerInterface.prototype.subscribe = function (request, cb) {
        const id = request.id;
        const messageId = this.dispatch('subscribe', request, (message) => {
            if (!this.staleTelemetryIds[id]) {
                cb(message.data);
            }
        });

        return function () {
            this.dispatch('unsubscribe', {
                id: messageId
            });
            delete this.callbacks[messageId];
        }.bind(this);
    };

    return WorkerInterface;
});
