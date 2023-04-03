/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import TimelineViewLayout from './TimelineViewLayout.vue';
import Vue from 'vue';

export default function TimelineViewProvider(openmct) {

    return {
        key: 'time-strip.view',
        name: 'TimeStrip',
        cssClass: 'icon-clock',
        canView(domainObject) {
            return domainObject.type === 'time-strip';
        },

        canEdit(domainObject) {
            return domainObject.type === 'time-strip';
        },

        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            TimelineViewLayout
                        },
                        provide: {
                            openmct,
                            domainObject,
                            composition: openmct.composition.get(domainObject),
                            objectPath
                        },
                        template: '<timeline-view-layout></timeline-view-layout>'
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
