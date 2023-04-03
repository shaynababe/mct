/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { FAULT_MANAGEMENT_TYPE, FAULT_MANAGEMENT_VIEW, FAULT_MANAGEMENT_NAMESPACE } from './constants';

export default class FaultManagementObjectProvider {
    constructor(openmct) {
        this.openmct = openmct;
        this.namespace = FAULT_MANAGEMENT_NAMESPACE;
        this.key = FAULT_MANAGEMENT_VIEW;
        this.objects = {};

        this.createFaultManagementRootObject();
    }

    createFaultManagementRootObject() {
        this.rootObject = {
            identifier: {
                key: this.key,
                namespace: this.namespace
            },
            name: 'Fault Management',
            type: FAULT_MANAGEMENT_TYPE,
            location: 'ROOT'
        };

        this.openmct.objects.addRoot(this.rootObject.identifier);
    }

    get(identifier) {
        if (identifier.key === FAULT_MANAGEMENT_VIEW) {
            return Promise.resolve(this.rootObject);
        }

        return Promise.reject();
    }
}
