/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './AutoflowTabularView'
], function (
    AutoflowTabularView
) {
    return function (options) {
        return function (openmct) {
            const views = (openmct.mainViews || openmct.objectViews);

            views.addProvider({
                name: "Autoflow Tabular",
                key: "autoflow",
                cssClass: "icon-packet",
                description: "A tabular view of packet contents.",
                canView: function (d) {
                    return !options || (options.type === d.type);
                },
                view: function (domainObject) {
                    return new AutoflowTabularView(
                        domainObject,
                        openmct,
                        document
                    );
                }
            });
        };
    };
});

