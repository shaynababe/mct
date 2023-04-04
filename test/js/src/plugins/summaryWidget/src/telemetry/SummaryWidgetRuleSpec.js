/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './SummaryWidgetRule'
], function (
    SummaryWidgetRule
) {
    describe('SummaryWidgetRule', function () {

        let rule;
        let telemetryState;

        beforeEach(function () {
            const formatMap = {
                raw: {
                    parse: function (datum) {
                        return datum.value;
                    }
                }
            };

            telemetryState = {
                objectId: {
                    formats: formatMap,
                    lastDatum: {
                    }
                },
                otherObjectId: {
                    formats: formatMap,
                    lastDatum: {
                    }
                }
            };
        });

        it('allows single condition rules with any', function () {
            rule = new SummaryWidgetRule({
                trigger: 'any',
                conditions: [{
                    object: 'objectId',
                    key: 'raw',
                    operation: 'greaterThan',
                    values: [
                        10
                    ]
                }]
            });

            telemetryState.objectId.lastDatum.value = 5;
            expect(rule.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 15;
            expect(rule.evaluate(telemetryState)).toBe(true);
        });

        it('allows single condition rules with all', function () {
            rule = new SummaryWidgetRule({
                trigger: 'all',
                conditions: [{
                    object: 'objectId',
                    key: 'raw',
                    operation: 'greaterThan',
                    values: [
                        10
                    ]
                }]
            });

            telemetryState.objectId.lastDatum.value = 5;
            expect(rule.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 15;
            expect(rule.evaluate(telemetryState)).toBe(true);
        });

        it('can combine multiple conditions with all', function () {
            rule = new SummaryWidgetRule({
                trigger: 'all',
                conditions: [{
                    object: 'objectId',
                    key: 'raw',
                    operation: 'greaterThan',
                    values: [
                        10
                    ]
                }, {
                    object: 'otherObjectId',
                    key: 'raw',
                    operation: 'greaterThan',
                    values: [
                        20
                    ]
                }]
            });

            telemetryState.objectId.lastDatum.value = 5;
            telemetryState.otherObjectId.lastDatum.value = 5;
            expect(rule.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 5;
            telemetryState.otherObjectId.lastDatum.value = 25;
            expect(rule.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 5;
            expect(rule.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 25;
            expect(rule.evaluate(telemetryState)).toBe(true);

        });

        it('can combine multiple conditions with any', function () {
            rule = new SummaryWidgetRule({
                trigger: 'any',
                conditions: [{
                    object: 'objectId',
                    key: 'raw',
                    operation: 'greaterThan',
                    values: [
                        10
                    ]
                }, {
                    object: 'otherObjectId',
                    key: 'raw',
                    operation: 'greaterThan',
                    values: [
                        20
                    ]
                }]
            });

            telemetryState.objectId.lastDatum.value = 5;
            telemetryState.otherObjectId.lastDatum.value = 5;
            expect(rule.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 5;
            telemetryState.otherObjectId.lastDatum.value = 25;
            expect(rule.evaluate(telemetryState)).toBe(true);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 5;
            expect(rule.evaluate(telemetryState)).toBe(true);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 25;
            expect(rule.evaluate(telemetryState)).toBe(true);
        });
    });
});
