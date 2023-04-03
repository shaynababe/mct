/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './SummaryWidgetCondition'
], function (
    SummaryWidgetCondition
) {

    describe('SummaryWidgetCondition', function () {
        let condition;
        let telemetryState;

        beforeEach(function () {
            // Format map intentionally uses different keys than those present
            // in datum, which serves to verify conditions use format map to get
            // data.
            const formatMap = {
                adjusted: {
                    parse: function (datum) {
                        return datum.value + 10;
                    }
                },
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

        it('can evaluate if a single object matches', function () {
            condition = new SummaryWidgetCondition({
                object: 'objectId',
                key: 'raw',
                operation: 'greaterThan',
                values: [
                    10
                ]
            });
            telemetryState.objectId.lastDatum.value = 5;
            expect(condition.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 15;
            expect(condition.evaluate(telemetryState)).toBe(true);
        });

        it('can evaluate if a single object matches (alternate keys)', function () {
            condition = new SummaryWidgetCondition({
                object: 'objectId',
                key: 'adjusted',
                operation: 'greaterThan',
                values: [
                    10
                ]
            });
            telemetryState.objectId.lastDatum.value = -5;
            expect(condition.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 5;
            expect(condition.evaluate(telemetryState)).toBe(true);
        });

        it('can evaluate "if all objects match"', function () {
            condition = new SummaryWidgetCondition({
                object: 'all',
                key: 'raw',
                operation: 'greaterThan',
                values: [
                    10
                ]
            });
            telemetryState.objectId.lastDatum.value = 0;
            telemetryState.otherObjectId.lastDatum.value = 0;
            expect(condition.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 0;
            telemetryState.otherObjectId.lastDatum.value = 15;
            expect(condition.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 0;
            expect(condition.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 15;
            expect(condition.evaluate(telemetryState)).toBe(true);
        });

        it('can evaluate "if any object matches"', function () {
            condition = new SummaryWidgetCondition({
                object: 'any',
                key: 'raw',
                operation: 'greaterThan',
                values: [
                    10
                ]
            });
            telemetryState.objectId.lastDatum.value = 0;
            telemetryState.otherObjectId.lastDatum.value = 0;
            expect(condition.evaluate(telemetryState)).toBe(false);
            telemetryState.objectId.lastDatum.value = 0;
            telemetryState.otherObjectId.lastDatum.value = 15;
            expect(condition.evaluate(telemetryState)).toBe(true);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 0;
            expect(condition.evaluate(telemetryState)).toBe(true);
            telemetryState.objectId.lastDatum.value = 15;
            telemetryState.otherObjectId.lastDatum.value = 15;
            expect(condition.evaluate(telemetryState)).toBe(true);
        });

    });
});
