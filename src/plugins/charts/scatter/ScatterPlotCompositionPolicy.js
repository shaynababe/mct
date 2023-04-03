/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import { SCATTER_PLOT_KEY } from './scatterPlotConstants';

export default function ScatterPlotCompositionPolicy(openmct) {
    function hasRange(metadata) {
        const rangeValues = metadata.valuesForHints(['range']).map((value) => {
            return value.source;
        });

        const uniqueRangeValues = new Set(rangeValues);

        return uniqueRangeValues && uniqueRangeValues.size > 1;
    }

    function hasScatterPlotTelemetry(domainObject) {
        if (!openmct.telemetry.isTelemetryObject(domainObject)) {
            return false;
        }

        let metadata = openmct.telemetry.getMetadata(domainObject);

        return metadata.values().length > 0 && hasRange(metadata);
    }

    return {
        allow: function (parent, child) {
            if (parent.type === SCATTER_PLOT_KEY) {
                if ((child.type === 'conditionSet') || (!hasScatterPlotTelemetry(child))) {
                    return false;
                }
            }

            return true;
        }
    };
}
