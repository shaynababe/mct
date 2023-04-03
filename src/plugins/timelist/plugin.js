/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import TimelistViewProvider from './TimelistViewProvider';
import { TIMELIST_TYPE } from './constants';
import TimeListInspectorViewProvider from "./inspector/TimeListInspectorViewProvider";
import TimelistCompositionPolicy from "@/plugins/timelist/TimelistCompositionPolicy";

export default function () {
    return function install(openmct) {
        openmct.types.addType(TIMELIST_TYPE, {
            name: 'Time List',
            key: TIMELIST_TYPE,
            description: 'A configurable, time-ordered list view of activities for a compatible mission plan file.',
            creatable: true,
            cssClass: 'icon-timelist',
            initialize: function (domainObject) {
                domainObject.configuration = {
                    sortOrderIndex: 0,
                    futureEventsIndex: 1,
                    futureEventsDurationIndex: 0,
                    futureEventsDuration: 20,
                    currentEventsIndex: 1,
                    currentEventsDurationIndex: 0,
                    currentEventsDuration: 20,
                    pastEventsIndex: 1,
                    pastEventsDurationIndex: 0,
                    pastEventsDuration: 20,
                    filter: ''
                };
                domainObject.composition = [];
            }
        });
        openmct.objectViews.addProvider(new TimelistViewProvider(openmct));
        openmct.inspectorViews.addProvider(new TimeListInspectorViewProvider(openmct));
        openmct.composition.addPolicy(new TimelistCompositionPolicy(openmct).allow);

    };
}
