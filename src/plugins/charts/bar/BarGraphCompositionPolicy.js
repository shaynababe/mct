/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { BAR_GRAPH_KEY } from './BarGraphConstants';

export default function BarGraphCompositionPolicy(openmct) {
    function hasRange(metadata) {
        const rangeValues = metadata.valuesForHints(['range']);

        return rangeValues && rangeValues.length > 0;
    }

    function hasBarGraphTelemetry(domainObject) {
        if (!openmct.telemetry.isTelemetryObject(domainObject)) {
            return false;
        }

        let metadata = openmct.telemetry.getMetadata(domainObject);

        return metadata.values().length > 0 && hasRange(metadata);
    }

    return {
        allow: function (parent, child) {
            if (parent.type === BAR_GRAPH_KEY) {
                if ((child.type === 'conditionSet') || (!hasBarGraphTelemetry(child))) {
                    return false;
                }
            }

            return true;
        }
    };
}
