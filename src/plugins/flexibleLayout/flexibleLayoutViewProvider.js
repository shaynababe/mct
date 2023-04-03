/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './components/flexibleLayout.vue',
    'vue'
], function (
    FlexibleLayoutComponent,
    Vue
) {
    function FlexibleLayoutViewProvider(openmct) {
        return {
            key: 'flexible-layout',
            name: 'FlexibleLayout',
            cssClass: 'icon-layout-view',
            canView: function (domainObject) {
                return domainObject.type === 'flexible-layout';
            },
            canEdit: function (domainObject) {
                return domainObject.type === 'flexible-layout';
            },
            view: function (domainObject, objectPath) {
                let component;

                return {
                    show: function (element, isEditing) {
                        component = new Vue({
                            el: element,
                            components: {
                                FlexibleLayoutComponent: FlexibleLayoutComponent.default
                            },
                            provide: {
                                openmct,
                                objectPath,
                                layoutObject: domainObject
                            },
                            data() {
                                return {
                                    isEditing: isEditing
                                };
                            },
                            template: '<flexible-layout-component ref="flexibleLayout" :isEditing="isEditing"></flexible-layout-component>'
                        });
                    },
                    getSelectionContext: function () {
                        return {
                            item: domainObject,
                            addContainer: component.$refs.flexibleLayout.addContainer,
                            deleteContainer: component.$refs.flexibleLayout.deleteContainer,
                            deleteFrame: component.$refs.flexibleLayout.deleteFrame,
                            type: 'flexible-layout'
                        };
                    },
                    onEditModeChange: function (isEditing) {
                        component.isEditing = isEditing;
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

    return FlexibleLayoutViewProvider;
});
