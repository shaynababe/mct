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
    function SummaryWidgetRule(definition) {
        this.name = definition.name;
        this.label = definition.label;
        this.id = definition.id;
        this.icon = definition.icon;
        this.style = definition.style;
        this.message = definition.message;
        this.description = definition.description;
        this.conditions = definition.conditions.map(function (cDefinition) {
            return new SummaryWidgetCondition(cDefinition);
        });
        this.trigger = definition.trigger;
    }

    /**
     * Evaluate the given rule against a telemetryState and return true if it
     * matches.
     */
    SummaryWidgetRule.prototype.evaluate = function (telemetryState) {
        let i;
        let result;

        if (this.trigger === 'all') {
            for (i = 0; i < this.conditions.length; i++) {
                result = this.conditions[i].evaluate(telemetryState);
                if (!result) {
                    return false;
                }
            }

            return true;
        } else if (this.trigger === 'any') {
            for (i = 0; i < this.conditions.length; i++) {
                result = this.conditions[i].evaluate(telemetryState);
                if (result) {
                    return true;
                }
            }

            return false;
        } else {
            throw new Error('Invalid rule trigger: ' + this.trigger);
        }
    };

    return SummaryWidgetRule;
});

