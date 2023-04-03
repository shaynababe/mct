/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import FaultManagementViewProvider from './FaultManagementViewProvider';
import FaultManagementObjectProvider from './FaultManagementObjectProvider';
import FaultManagementInspectorViewProvider from './FaultManagementInspectorViewProvider';

import { FAULT_MANAGEMENT_TYPE, FAULT_MANAGEMENT_NAMESPACE } from './constants';

export default function FaultManagementPlugin() {
    return function (openmct) {
        openmct.types.addType(FAULT_MANAGEMENT_TYPE, {
            name: 'Fault Management',
            creatable: false,
            description: 'Fault Management View',
            cssClass: 'icon-bell'
        });

        openmct.objectViews.addProvider(new FaultManagementViewProvider(openmct));
        openmct.inspectorViews.addProvider(new FaultManagementInspectorViewProvider(openmct));
        openmct.objects.addProvider(FAULT_MANAGEMENT_NAMESPACE, new FaultManagementObjectProvider(openmct));
    };
}
