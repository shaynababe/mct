/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([], function () {
    /**
     * Controller for individual rows of an Autoflow Tabular View.
     * Subscribes to telemetry and updates row data.
     *
     * @param {DomainObject} domainObject the object being viewed
     * @param {*} data the view data
     * @param openmct a reference to the openmct application
     * @param {Function} callback a callback to invoke with "last updated" timestamps
     */
    function AutoflowTabularRowController(domainObject, data, openmct, callback) {
        this.domainObject = domainObject;
        this.data = data;
        this.openmct = openmct;
        this.callback = callback;

        this.metadata = this.openmct.telemetry.getMetadata(this.domainObject);
        this.ranges = this.metadata.valuesForHints(['range']);
        this.domains = this.metadata.valuesForHints(['domain']);
        this.rangeFormatter =
            this.openmct.telemetry.getValueFormatter(this.ranges[0]);
        this.domainFormatter =
            this.openmct.telemetry.getValueFormatter(this.domains[0]);
        this.evaluator =
            this.openmct.telemetry.limitEvaluator(this.domainObject);

        this.initialized = false;
    }

    /**
     * Update row to reflect incoming telemetry data.
     * @private
     */
    AutoflowTabularRowController.prototype.updateRowData = function (datum) {
        const violations = this.evaluator.evaluate(datum, this.ranges[0]);

        this.initialized = true;
        this.data.classes = violations ? violations.cssClass : "";
        this.data.value = this.rangeFormatter.format(datum);
        this.callback(this.domainFormatter.format(datum));
    };

    /**
     * Activate this controller; begin listening for changes.
     */
    AutoflowTabularRowController.prototype.activate = function () {
        this.unsubscribe = this.openmct.telemetry.subscribe(
            this.domainObject,
            this.updateRowData.bind(this)
        );

        this.openmct.telemetry.request(
            this.domainObject,
            { size: 1 }
        ).then(function (history) {
            if (!this.initialized && history.length > 0) {
                this.updateRowData(history[history.length - 1]);
            }
        }.bind(this));
    };

    /**
     * Destroy this controller; detach any associated resources.
     */
    AutoflowTabularRowController.prototype.destroy = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    };

    return AutoflowTabularRowController;
});
