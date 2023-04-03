/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import LADTableConfigurationComponent from './components/LADTableConfiguration.vue';
import Vue from 'vue';

export default function LADTableConfigurationViewProvider(openmct) {
    return {
        key: 'lad-table-configuration',
        name: 'LAD Table Configuration',
        canView(selection) {
            if (selection.length !== 1 || selection[0].length === 0) {
                return false;
            }

            const object = selection[0][0].context.item;

            return object?.type === 'LadTable' || object?.type === 'LadTableSet';
        },
        view(selection) {
            let component;

            return {
                show(element) {
                    component = new Vue({
                        el: element,
                        components: {
                            LADTableConfiguration: LADTableConfigurationComponent
                        },
                        provide: {
                            openmct
                        },
                        template: '<LADTableConfiguration />'
                    });
                },
                priority() {
                    return 1;
                },
                destroy() {
                    if (component) {
                        component.$destroy();
                        component = undefined;
                    }
                }
            };
        }
    };
}
