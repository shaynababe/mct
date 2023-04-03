/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './components/tabs.vue',
    'vue'
], function (
    TabsComponent,
    Vue
) {
    function Tabs(openmct) {
        return {
            key: 'tabs',
            name: 'Tabs',
            cssClass: 'icon-list-view',
            canView: function (domainObject) {
                return domainObject.type === 'tabs';
            },
            canEdit: function (domainObject) {
                return domainObject.type === 'tabs';
            },
            view: function (domainObject, objectPath) {
                let component;

                return {
                    show: function (element, editMode) {
                        component = new Vue({
                            el: element,
                            components: {
                                TabsComponent: TabsComponent.default
                            },
                            provide: {
                                openmct,
                                domainObject,
                                objectPath,
                                composition: openmct.composition.get(domainObject)
                            },
                            data() {
                                return {
                                    isEditing: editMode
                                };
                            },
                            template: '<tabs-component :isEditing="isEditing"></tabs-component>'
                        });
                    },
                    onEditModeChange(editMode) {
                        component.isEditing = editMode;
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

    return Tabs;
});
