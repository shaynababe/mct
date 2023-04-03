/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import PlanViewConfiguration from './components/PlanViewConfiguration.vue';
import Vue from 'vue';

export default function GanttChartInspectorViewProvider(openmct) {
    return {
        key: 'plan-inspector',
        name: 'Config',
        canView: function (selection) {
            if (selection.length === 0 || selection[0].length === 0) {
                return false;
            }

            const domainObject = selection[0][0].context.item;

            return domainObject?.type === 'gantt-chart';
        },
        view: function (selection) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            PlanViewConfiguration
                        },
                        provide: {
                            openmct,
                            selection: selection
                        },
                        template: '<plan-view-configuration></plan-view-configuration>'
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
