/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import TimelistPropertiesView from "./TimelistPropertiesView.vue";
import { TIMELIST_TYPE } from '../constants';
import Vue from 'vue';

export default function TimeListInspectorViewProvider(openmct) {
    return {
        key: 'timelist-inspector',
        name: 'Timelist Inspector View',
        canView: function (selection) {
            if (selection.length === 0 || selection[0].length === 0) {
                return false;
            }

            let context = selection[0][0].context;

            return context && context.item
                && context.item.type === TIMELIST_TYPE;
        },
        view: function (selection) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            TimelistPropertiesView: TimelistPropertiesView
                        },
                        provide: {
                            openmct,
                            domainObject: selection[0][0].context.item
                        },
                        template: '<timelist-properties-view></timelist-properties-view>'
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
