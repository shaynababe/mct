/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([], function () {

    function TelemetryAverager(telemetryAPI, timeAPI, domainObject, samples, averageDatumCallback) {
        this.telemetryAPI = telemetryAPI;
        this.timeAPI = timeAPI;

        this.domainObject = domainObject;
        this.samples = samples;
        this.averagingWindow = [];

        this.rangeKey = undefined;
        this.rangeFormatter = undefined;
        this.setRangeKeyAndFormatter();

        // Defined dynamically based on current time system
        this.domainKey = undefined;
        this.domainFormatter = undefined;

        this.averageDatumCallback = averageDatumCallback;
    }

    TelemetryAverager.prototype.createAverageDatum = function (telemetryDatum) {
        this.setDomainKeyAndFormatter();

        const timeValue = this.domainFormatter.parse(telemetryDatum);
        const rangeValue = this.rangeFormatter.parse(telemetryDatum);

        this.averagingWindow.push(rangeValue);

        if (this.averagingWindow.length < this.samples) {
            // We do not have enough data to produce an average
            return;
        } else if (this.averagingWindow.length > this.samples) {
            //Do not let averaging window grow beyond defined sample size
            this.averagingWindow.shift();
        }

        const averageValue = this.calculateMean();

        const meanDatum = {};
        meanDatum[this.domainKey] = timeValue;
        meanDatum.value = averageValue;

        this.averageDatumCallback(meanDatum);
    };

    /**
     * @private
     */
    TelemetryAverager.prototype.calculateMean = function () {
        let sum = 0;
        let i = 0;

        for (; i < this.averagingWindow.length; i++) {
            sum += this.averagingWindow[i];
        }

        return sum / this.averagingWindow.length;
    };

    /**
     * The mean telemetry filter produces domain values in whatever time
     * system is currently selected from the conductor. Because this can
     * change dynamically, the averager needs to be updated regularly with
     * the current domain.
     * @private
     */
    TelemetryAverager.prototype.setDomainKeyAndFormatter = function () {
        const domainKey = this.timeAPI.timeSystem().key;
        if (domainKey !== this.domainKey) {
            this.domainKey = domainKey;
            this.domainFormatter = this.getFormatter(domainKey);
        }
    };

    /**
     * @private
     */
    TelemetryAverager.prototype.setRangeKeyAndFormatter = function () {
        const metadatas = this.telemetryAPI.getMetadata(this.domainObject);
        const rangeValues = metadatas.valuesForHints(['range']);

        this.rangeKey = rangeValues[0].key;
        this.rangeFormatter = this.getFormatter(this.rangeKey);
    };

    /**
     * @private
     */
    TelemetryAverager.prototype.getFormatter = function (key) {
        const objectMetadata = this.telemetryAPI.getMetadata(this.domainObject);
        const valueMetadata = objectMetadata.value(key);

        return this.telemetryAPI.getValueFormatter(valueMetadata);
    };

    return TelemetryAverager;
});
