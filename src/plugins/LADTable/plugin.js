/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import LADTableViewProvider from './LADTableViewProvider';
import LADTableSetViewProvider from './LADTableSetViewProvider';
import ladTableCompositionPolicy from './LADTableCompositionPolicy';
import LADTableConfigurationViewProvider from './LADTableConfigurationViewProvider';
import LADTableViewActions from './ViewActions';

export default function plugin() {
    return function install(openmct) {

        openmct.objectViews.addProvider(new LADTableViewProvider(openmct));
        openmct.objectViews.addProvider(new LADTableSetViewProvider(openmct));
        openmct.inspectorViews.addProvider(new LADTableConfigurationViewProvider(openmct));

        openmct.types.addType('LadTable', {
            name: "LAD Table",
            creatable: true,
            description: "Display the current value for one or more telemetry end points in a fixed table. Each row is a telemetry end point.",
            cssClass: 'icon-tabular-lad',
            initialize(domainObject) {
                domainObject.composition = [];
            }
        });

        openmct.types.addType('LadTableSet', {
            name: "LAD Table Set",
            creatable: true,
            description: "Group LAD Tables together into a single view with sub-headers.",
            cssClass: 'icon-tabular-lad-set',
            initialize(domainObject) {
                domainObject.composition = [];
            }
        });

        openmct.composition.addPolicy(ladTableCompositionPolicy(openmct));

        LADTableViewActions.forEach(action => {
            openmct.actions.register(action);
        });
    };
}
