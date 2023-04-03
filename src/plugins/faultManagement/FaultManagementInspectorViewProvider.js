/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import FaultManagementInspector from './FaultManagementInspector.vue';

import Vue from 'vue';

import { FAULT_MANAGEMENT_INSPECTOR, FAULT_MANAGEMENT_TYPE } from './constants';

export default function FaultManagementInspectorViewProvider(openmct) {
    return {
        openmct: openmct,
        key: FAULT_MANAGEMENT_INSPECTOR,
        name: 'Fault Management Configuration',
        canView: (selection) => {
            if (selection.length !== 1 || selection[0].length === 0) {
                return false;
            }

            let object = selection[0][0].context.item;

            return object && object.type === FAULT_MANAGEMENT_TYPE;
        },
        view: (selection) => {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            FaultManagementInspector
                        },
                        provide: {
                            openmct
                        },
                        template: '<FaultManagementInspector></FaultManagementInspector>'
                    });
                },
                priority: function () {
                    return openmct.priority.HIGH + 1;
                },
                destroy: function () {
                    if (component) {
                        component.$destroy();
                        component = undefined;
                    }
                }
            };
        }
    };
}
