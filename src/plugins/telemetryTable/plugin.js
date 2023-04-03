/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import TelemetryTableViewProvider from './TelemetryTableViewProvider';
import TableConfigurationViewProvider from './TableConfigurationViewProvider';
import TelemetryTableType from './TelemetryTableType';
import TelemetryTableViewActions from './ViewActions';

export default function plugin() {
    return function install(openmct) {
        openmct.objectViews.addProvider(new TelemetryTableViewProvider(openmct));
        openmct.inspectorViews.addProvider(new TableConfigurationViewProvider(openmct));
        openmct.types.addType('table', TelemetryTableType);
        openmct.composition.addPolicy((parent, child) => {
            if (parent.type === 'table') {
                return Object.prototype.hasOwnProperty.call(child, 'telemetry');
            } else {
                return true;
            }
        });

        TelemetryTableViewActions.forEach(action => {
            openmct.actions.register(action);
        });
    };
}
