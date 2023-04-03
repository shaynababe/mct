/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import PlanViewProvider from './PlanViewProvider';
import ActivityInspectorViewProvider from "./inspector/ActivityInspectorViewProvider";
import GanttChartInspectorViewProvider from "./inspector/GanttChartInspectorViewProvider";
import ganttChartCompositionPolicy from './GanttChartCompositionPolicy';
import { DEFAULT_CONFIGURATION } from './PlanViewConfiguration';

export default function (options = {}) {
    return function install(openmct) {
        openmct.types.addType('plan', {
            name: 'Plan',
            key: 'plan',
            description: 'A non-configurable timeline-like view for a compatible plan file.',
            creatable: options.creatable ?? false,
            cssClass: 'icon-plan',
            form: [
                {
                    name: 'Upload Plan (JSON File)',
                    key: 'selectFile',
                    control: 'file-input',
                    required: true,
                    text: 'Select File...',
                    type: 'application/json',
                    property: [
                        "selectFile"
                    ]
                }
            ],
            initialize: function (domainObject) {
                domainObject.configuration = {
                    clipActivityNames: DEFAULT_CONFIGURATION.clipActivityNames
                };
            }
        });
        // Name TBD and subject to change
        openmct.types.addType('gantt-chart', {
            name: 'Gantt Chart',
            key: 'gantt-chart',
            description: 'A configurable timeline-like view for a compatible plan file.',
            creatable: true,
            cssClass: 'icon-plan',
            form: [],
            initialize(domainObject) {
                domainObject.configuration = {
                    clipActivityNames: true
                };
                domainObject.composition = [];
            }
        });
        openmct.objectViews.addProvider(new PlanViewProvider(openmct));
        openmct.inspectorViews.addProvider(new ActivityInspectorViewProvider(openmct));
        openmct.inspectorViews.addProvider(new GanttChartInspectorViewProvider(openmct));
        openmct.composition.addPolicy(ganttChartCompositionPolicy(openmct));
    };
}

