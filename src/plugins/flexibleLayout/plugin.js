/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './flexibleLayoutViewProvider',
    './utils/container',
    './toolbarProvider'
], function (
    FlexibleLayoutViewProvider,
    Container,
    ToolBarProvider
) {
    return function plugin() {

        return function install(openmct) {
            openmct.objectViews.addProvider(new FlexibleLayoutViewProvider(openmct));

            openmct.types.addType('flexible-layout', {
                name: "Flexible Layout",
                creatable: true,
                description: "A fluid, flexible layout canvas that can display multiple objects in rows or columns.",
                cssClass: 'icon-flexible-layout',
                initialize: function (domainObject) {
                    domainObject.configuration = {
                        containers: [new Container.default(50), new Container.default(50)],
                        rowsLayout: false
                    };
                    domainObject.composition = [];
                }
            });

            let toolbar = ToolBarProvider.default(openmct);

            openmct.toolbars.addProvider(toolbar);
        };
    };
});
