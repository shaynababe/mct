/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './FolderGridView',
    './FolderListView'
], function (
    FolderGridView,
    FolderListView
) {
    return function plugin() {
        return function install(openmct) {
            openmct.types.addType('folder', {
                name: "Folder",
                key: "folder",
                description: "Create folders to organize other objects or links to objects without the ability to edit it's properties.",
                cssClass: "icon-folder",
                creatable: true,
                initialize: function (domainObject) {
                    domainObject.composition = [];
                }
            });

            openmct.objectViews.addProvider(new FolderGridView(openmct));
            openmct.objectViews.addProvider(new FolderListView(openmct));
        };
    };
});
