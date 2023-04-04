/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import ConditionSetViewProvider from './ConditionSetViewProvider.js';
import ConditionSetCompositionPolicy from "./ConditionSetCompositionPolicy";
import ConditionSetMetadataProvider from './ConditionSetMetadataProvider';
import ConditionSetTelemetryProvider from './ConditionSetTelemetryProvider';
import { v4 as uuid } from 'uuid';

export default function ConditionPlugin() {

    return function install(openmct) {

        openmct.types.addType('conditionSet', {
            name: 'Condition Set',
            key: 'conditionSet',
            description: 'Monitor and evaluate telemetry values in real-time with a wide variety of criteria. Use to control the styling of many objects in Open MCT.',
            creatable: true,
            cssClass: 'icon-conditional',
            initialize: function (domainObject) {
                domainObject.configuration = {
                    conditionTestData: [],
                    conditionCollection: [{
                        isDefault: true,
                        id: uuid(),
                        configuration: {
                            name: 'Default',
                            output: 'Default',
                            trigger: 'all',
                            criteria: []
                        },
                        summary: 'Default condition'
                    }]
                };
                domainObject.composition = [];
                domainObject.telemetry = {};
            }
        });
        let compositionPolicy = new ConditionSetCompositionPolicy(openmct);
        openmct.composition.addPolicy(compositionPolicy.allow.bind(compositionPolicy));
        openmct.telemetry.addProvider(new ConditionSetMetadataProvider(openmct));
        openmct.telemetry.addProvider(new ConditionSetTelemetryProvider(openmct));
        openmct.objectViews.addProvider(new ConditionSetViewProvider(openmct));

    };
}
