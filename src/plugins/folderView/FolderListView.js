/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './components/ListView.vue',
    './constants.js',
    'vue',
    'moment'
], function (
    ListViewComponent,
    constants,
    Vue,
    Moment
) {
    function FolderListView(openmct) {
        const ALLOWED_FOLDER_TYPES = constants.ALLOWED_FOLDER_TYPES;

        return {
            key: 'list-view',
            name: 'List View',
            cssClass: 'icon-list-view',
            canView: function (domainObject) {
                return ALLOWED_FOLDER_TYPES.includes(domainObject.type);
            },
            view: function (domainObject) {
                let component;

                return {
                    show: function (element) {
                        component = new Vue({
                            el: element,
                            components: {
                                listViewComponent: ListViewComponent.default
                            },
                            provide: {
                                openmct,
                                domainObject,
                                Moment
                            },
                            template: '<list-view-component></list-view-component>'
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

    return FolderListView;
});
