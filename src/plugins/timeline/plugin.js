/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import TimelineViewProvider from './TimelineViewProvider';
import timelineInterceptor from "./timelineInterceptor";
import TimelineCompositionPolicy from "./TimelineCompositionPolicy";

export default function () {
    return function install(openmct) {
        openmct.types.addType('time-strip', {
            name: 'Time Strip',
            key: 'time-strip',
            description: 'Compose and display time-based telemetry and other object types in a timeline-like view.',
            creatable: true,
            cssClass: 'icon-timeline',
            initialize: function (domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    useIndependentTime: false
                };
            }
        });
        timelineInterceptor(openmct);
        openmct.composition.addPolicy(new TimelineCompositionPolicy(openmct).allow);

        openmct.objectViews.addProvider(new TimelineViewProvider(openmct));
    };
}

