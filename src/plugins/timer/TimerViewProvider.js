/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import Timer from './components/Timer.vue';
import Vue from 'vue';

export default function TimerViewProvider(openmct) {
    return {
        key: 'timer.view',
        name: 'Timer',
        cssClass: 'icon-timer',
        canView(domainObject) {
            return domainObject.type === 'timer';
        },

        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            Timer
                        },
                        provide: {
                            openmct,
                            objectPath,
                            currentView: this
                        },
                        data() {
                            return {
                                domainObject
                            };
                        },
                        template: '<timer :domain-object="domainObject" />'
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
