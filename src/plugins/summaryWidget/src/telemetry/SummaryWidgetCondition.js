/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './operations'
], function (
    OPERATIONS
) {

    function SummaryWidgetCondition(definition) {
        this.object = definition.object;
        this.key = definition.key;
        this.values = definition.values;
        if (!definition.operation) {
            // TODO: better handling for default rule.
            this.evaluate = function () {
                return true;
            };
        } else {
            this.comparator = OPERATIONS[definition.operation].operation;
        }
    }

    SummaryWidgetCondition.prototype.evaluate = function (telemetryState) {
        const stateKeys = Object.keys(telemetryState);
        let state;
        let result;
        let i;

        if (this.object === 'any') {
            for (i = 0; i < stateKeys.length; i++) {
                state = telemetryState[stateKeys[i]];
                result = this.evaluateState(state);
                if (result) {
                    return true;
                }
            }

            return false;
        } else if (this.object === 'all') {
            for (i = 0; i < stateKeys.length; i++) {
                state = telemetryState[stateKeys[i]];
                result = this.evaluateState(state);
                if (!result) {
                    return false;
                }
            }

            return true;
        } else {
            return this.evaluateState(telemetryState[this.object]);
        }
    };

    SummaryWidgetCondition.prototype.evaluateState = function (state) {
        const testValues = [
            state.formats[this.key].parse(state.lastDatum)
        ].concat(this.values);

        return this.comparator(testValues);
    };

    return SummaryWidgetCondition;
});
