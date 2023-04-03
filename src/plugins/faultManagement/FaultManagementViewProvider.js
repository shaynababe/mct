/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import FaultManagementView from './FaultManagementView.vue';
import { FAULT_MANAGEMENT_TYPE, FAULT_MANAGEMENT_VIEW } from './constants';
import Vue from 'vue';

export default class FaultManagementViewProvider {
    constructor(openmct) {
        this.openmct = openmct;
        this.key = FAULT_MANAGEMENT_VIEW;
    }

    canView(domainObject) {
        return domainObject.type === FAULT_MANAGEMENT_TYPE;
    }

    canEdit(domainObject) {
        return false;
    }

    view(domainObject) {
        let component;
        const openmct = this.openmct;

        return {
            show: (element) => {
                component = new Vue({
                    el: element,
                    components: {
                        FaultManagementView
                    },
                    provide: {
                        openmct,
                        domainObject
                    },
                    template: '<FaultManagementView></FaultManagementView>'
                });
            },
            destroy: () => {
                if (!component) {
                    return;
                }

                component.$destroy();
                component = undefined;
            }
        };
    }
}
