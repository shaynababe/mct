/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import { BAR_GRAPH_KEY } from './BarGraphConstants';
import BarGraphViewProvider from './BarGraphViewProvider';
import BarGraphInspectorViewProvider from './inspector/BarGraphInspectorViewProvider';
import BarGraphCompositionPolicy from './BarGraphCompositionPolicy';

export default function () {
    return function install(openmct) {
        openmct.types.addType(BAR_GRAPH_KEY, {
            key: BAR_GRAPH_KEY,
            name: "Graph",
            cssClass: "icon-bar-chart",
            description: "Visualize data as a bar or line graph.",
            creatable: true,
            initialize: function (domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    barStyles: { series: {} },
                    axes: {},
                    useInterpolation: 'linear',
                    useBar: true
                };
            },
            priority: 891
        });

        openmct.objectViews.addProvider(new BarGraphViewProvider(openmct));

        openmct.inspectorViews.addProvider(new BarGraphInspectorViewProvider(openmct));

        openmct.composition.addPolicy(new BarGraphCompositionPolicy(openmct).allow);
    };
}

