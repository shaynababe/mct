/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import ConditionWidgetComponent from './components/ConditionWidget.vue';
import Vue from 'vue';

export default function ConditionWidget(openmct) {
    return {
        key: 'conditionWidget',
        name: 'Condition Widget',
        cssClass: 'icon-condition-widget',
        canView: function (domainObject) {
            return domainObject.type === 'conditionWidget';
        },
        canEdit: function (domainObject) {
            return domainObject.type === 'conditionWidget';
        },
        view: function (domainObject) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            ConditionWidgetComponent: ConditionWidgetComponent
                        },
                        provide: {
                            openmct,
                            domainObject
                        },
                        template: '<condition-widget-component></condition-widget-component>'
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
