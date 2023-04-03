/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './tabs'
], function (
    Tabs
) {
    return function plugin() {
        return function install(openmct) {
            openmct.objectViews.addProvider(new Tabs(openmct));

            openmct.types.addType('tabs', {
                name: "Tabs View",
                description: 'Quickly navigate between multiple objects of any type using tabs.',
                creatable: true,
                cssClass: 'icon-tabs-view',
                initialize(domainObject) {
                    domainObject.composition = [];
                    domainObject.keep_alive = true;
                },
                form: [
                    {
                        "key": "keep_alive",
                        "name": "Eager Load Tabs",
                        "control": "select",
                        "options": [
                            {
                                'name': 'True',
                                'value': true
                            },
                            {
                                'name': 'False',
                                'value': false
                            }
                        ],
                        "required": true,
                        "cssClass": "l-input"
                    }
                ]
            });
        };
    };
});
