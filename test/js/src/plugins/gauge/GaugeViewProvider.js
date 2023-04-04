/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import GaugeComponent from './components/Gauge.vue';
import Vue from 'vue';

export default function GaugeViewProvider(openmct) {
    return {
        key: 'gauge',
        name: 'Gauge',
        cssClass: 'icon-gauge',
        canView: function (domainObject) {
            return domainObject.type === 'gauge';
        },
        canEdit: function (domainObject) {
            if (domainObject.type === 'gauge') {
                return true;
            }
        },
        view: function (domainObject) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            GaugeComponent
                        },
                        provide: {
                            openmct,
                            domainObject,
                            composition: openmct.composition.get(domainObject)
                        },
                        template: '<gauge-component></gauge-component>'
                    });
                },
                destroy: function (element) {
                    component.$destroy();
                    component = undefined;
                }
            };
        },
        priority: function () {
            return 1;
        }
    };
}
