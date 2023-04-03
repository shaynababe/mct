/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './EvaluatorPool'
], function (
    EvaluatorPool
) {

    function SummaryWidgetTelemetryProvider(openmct) {
        this.pool = new EvaluatorPool(openmct);
    }

    SummaryWidgetTelemetryProvider.prototype.supportsRequest = function (domainObject, options) {
        return domainObject.type === 'summary-widget';
    };

    SummaryWidgetTelemetryProvider.prototype.request = function (domainObject, options) {
        if (options.strategy !== 'latest' && options.size !== 1) {
            return Promise.resolve([]);
        }

        const evaluator = this.pool.get(domainObject);

        return evaluator.requestLatest(options)
            .then(function (latestDatum) {
                this.pool.release(evaluator);

                return latestDatum ? [latestDatum] : [];
            }.bind(this));
    };

    SummaryWidgetTelemetryProvider.prototype.supportsSubscribe = function (domainObject) {
        return domainObject.type === 'summary-widget';
    };

    SummaryWidgetTelemetryProvider.prototype.subscribe = function (domainObject, callback) {
        const evaluator = this.pool.get(domainObject);
        const unsubscribe = evaluator.subscribe(callback);

        return function () {
            this.pool.release(evaluator);
            unsubscribe();
        }.bind(this);
    };

    return SummaryWidgetTelemetryProvider;
});
