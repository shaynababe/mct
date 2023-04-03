/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define(
    [],
    function () {

        function SummaryWidgetsCompositionPolicy(openmct) {
            this.openmct = openmct;
        }

        SummaryWidgetsCompositionPolicy.prototype.allow = function (parent, child) {
            const parentType = parent.type;

            if (parentType === 'summary-widget' && !this.openmct.telemetry.isTelemetryObject(child)) {
                return false;
            }

            return true;
        };

        return SummaryWidgetsCompositionPolicy;
    }
);
