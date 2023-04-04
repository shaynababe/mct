/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([], function () {

    function MockTelemetryApi() {
        this.createSpy('subscribe');
        this.createSpy('getMetadata');

        this.metadata = this.createMockMetadata();
        this.setDefaultRangeTo('defaultRange');
        this.unsubscribe = jasmine.createSpy('unsubscribe');
        this.mockReceiveTelemetry = this.mockReceiveTelemetry.bind(this);
    }

    MockTelemetryApi.prototype.subscribe = function () {
        return this.unsubscribe;
    };

    MockTelemetryApi.prototype.getMetadata = function (object) {
        return this.metadata;
    };

    MockTelemetryApi.prototype.request = jasmine.createSpy('request');

    MockTelemetryApi.prototype.getValueFormatter = function (valueMetadata) {
        const mockValueFormatter = jasmine.createSpyObj("valueFormatter", [
            "parse"
        ]);

        mockValueFormatter.parse.and.callFake(function (value) {
            return value[valueMetadata.key];
        });

        return mockValueFormatter;
    };

    MockTelemetryApi.prototype.mockReceiveTelemetry = function (newTelemetryDatum) {
        const subscriptionCallback = this.subscribe.calls.mostRecent().args[1];
        subscriptionCallback(newTelemetryDatum);
    };

    /**
     * @private
     */
    MockTelemetryApi.prototype.onRequestReturn = function (telemetryData) {
        this.requestTelemetry = telemetryData;
    };

    /**
     * @private
     */
    MockTelemetryApi.prototype.setDefaultRangeTo = function (rangeKey) {
        const mockMetadataValue = {
            key: rangeKey
        };
        this.metadata.valuesForHints.and.returnValue([mockMetadataValue]);
    };

    /**
     * @private
     */
    MockTelemetryApi.prototype.createMockMetadata = function () {
        const mockMetadata = jasmine.createSpyObj("metadata", [
            'value',
            'valuesForHints'
        ]);

        mockMetadata.value.and.callFake(function (key) {
            return {
                key: key
            };
        });

        return mockMetadata;
    };

    /**
     * @private
     */
    MockTelemetryApi.prototype.createSpy = function (functionName) {
        this[functionName] = this[functionName].bind(this);
        spyOn(this, functionName);
        this[functionName].and.callThrough();
    };

    return MockTelemetryApi;
});
