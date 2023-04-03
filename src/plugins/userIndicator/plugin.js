/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import UserIndicator from './components/UserIndicator.vue';
import Vue from 'vue';

export default function UserIndicatorPlugin() {

    function addIndicator(openmct) {
        const userIndicator = new Vue ({
            components: {
                UserIndicator
            },
            provide: {
                openmct: openmct
            },
            template: '<UserIndicator />'
        });

        openmct.indicators.add({
            key: 'user-indicator',
            element: userIndicator.$mount().$el,
            priority: openmct.priority.HIGH
        });
    }

    return function install(openmct) {
        if (openmct.user.hasProvider()) {
            addIndicator(openmct);
        } else {
            // back up if user provider added after indicator installed
            openmct.user.on('providerAdded', () => {
                addIndicator(openmct);
            });
        }
    };
}
