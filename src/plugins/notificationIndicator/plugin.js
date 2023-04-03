/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import Vue from 'vue';
import NotificationIndicator from './components/NotificationIndicator.vue';

export default function plugin() {
    return function install(openmct) {
        let component = new Vue ({
            components: {
                NotificationIndicator: NotificationIndicator
            },
            provide: {
                openmct
            },
            template: '<NotificationIndicator></NotificationIndicator>'
        });

        let indicator = {
            key: 'notifications-indicator',
            element: component.$mount().$el,
            priority: openmct.priority.DEFAULT
        };

        openmct.indicators.add(indicator);
    };
}
