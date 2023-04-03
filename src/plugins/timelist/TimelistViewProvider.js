/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import Timelist from './Timelist.vue';
import { TIMELIST_TYPE } from './constants';
import Vue from 'vue';

export default function TimelistViewProvider(openmct) {

    return {
        key: 'timelist.view',
        name: 'Time List',
        cssClass: 'icon-timelist',
        canView(domainObject) {
            return domainObject.type === TIMELIST_TYPE;
        },

        canEdit(domainObject) {
            return domainObject.type === TIMELIST_TYPE;
        },

        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {

                    component = new Vue({
                        el: element,
                        components: {
                            Timelist
                        },
                        provide: {
                            openmct,
                            domainObject,
                            path: objectPath,
                            composition: openmct.composition.get(domainObject)
                        },
                        template: '<timelist></timelist>'
                    });
                },
                destroy: function () {
                    component.$destroy();
                    component = undefined;
                }
            };
        }
    };
}
