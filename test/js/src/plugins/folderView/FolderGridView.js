/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './components/GridView.vue',
    './constants.js',
    'vue'
], function (
    GridViewComponent,
    constants,
    Vue
) {
    function FolderGridView(openmct) {
        const ALLOWED_FOLDER_TYPES = constants.ALLOWED_FOLDER_TYPES;

        return {
            key: 'grid',
            name: 'Grid View',
            cssClass: 'icon-thumbs-strip',
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
                                gridViewComponent: GridViewComponent.default
                            },
                            provide: {
                                openmct,
                                domainObject
                            },
                            template: '<grid-view-component></grid-view-component>'
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

    return FolderGridView;
});
