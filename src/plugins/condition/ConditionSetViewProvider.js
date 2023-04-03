/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import ConditionSet from './components/ConditionSet.vue';
import Vue from 'vue';

const DEFAULT_VIEW_PRIORITY = 100;

export default class ConditionSetViewProvider {
    constructor(openmct) {
        this.openmct = openmct;
        this.name = 'Conditions View';
        this.key = 'conditionSet.view';
        this.cssClass = 'icon-conditional';
    }

    canView(domainObject, objectPath) {
        const isConditionSet = domainObject.type === 'conditionSet';

        return isConditionSet && this.openmct.router.isNavigatedObject(objectPath);
    }

    canEdit(domainObject, objectPath) {
        const isConditionSet = domainObject.type === 'conditionSet';

        return isConditionSet && this.openmct.router.isNavigatedObject(objectPath);
    }

    view(domainObject, objectPath) {
        let component;
        const openmct = this.openmct;

        return {
            show: (container, isEditing) => {
                component = new Vue({
                    el: container,
                    components: {
                        ConditionSet
                    },
                    provide: {
                        openmct,
                        domainObject,
                        objectPath
                    },
                    data() {
                        return {
                            isEditing
                        };
                    },
                    template: '<condition-set :isEditing="isEditing"></condition-set>'
                });
            },
            onEditModeChange: (isEditing) => {
                component.isEditing = isEditing;
            },
            destroy: () => {
                component.$destroy();
                component = undefined;
            }
        };
    }

    priority(domainObject) {
        if (domainObject.type === 'conditionSet') {
            return Number.MAX_VALUE;
        } else {
            return DEFAULT_VIEW_PRIORITY;
        }
    }
}
