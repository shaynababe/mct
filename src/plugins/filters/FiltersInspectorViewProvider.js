/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './components/FiltersView.vue',
    'vue'
], function (
    FiltersView,
    Vue
) {

    function FiltersInspectorViewProvider(openmct, supportedObjectTypesArray) {
        return {
            key: 'filters-inspector',
            name: 'Filters',
            canView: function (selection) {
                const domainObject = selection?.[0]?.[0]?.context?.item;

                return domainObject && supportedObjectTypesArray.some(type => domainObject.type === type);
            },
            view: function (selection) {
                let component;

                const domainObject = selection?.[0]?.[0]?.context?.item;

                return {
                    show: function (element) {
                        component = new Vue({
                            el: element,
                            components: {
                                FiltersView: FiltersView.default
                            },
                            provide: {
                                openmct
                            },
                            template: '<filters-view></filters-view>'
                        });
                    },
                    showTab: function (isEditing) {
                        const hasPersistedFilters = Boolean(domainObject?.configuration?.filters);
                        const hasGlobalFilters = Boolean(domainObject?.configuration?.globalFilters);

                        return hasPersistedFilters || hasGlobalFilters;
                    },
                    priority: function () {
                        return openmct.priority.DEFAULT;
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

    return FiltersInspectorViewProvider;
});
