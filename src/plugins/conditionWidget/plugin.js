/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import ConditionWidgetViewProvider from './ConditionWidgetViewProvider.js';

export default function plugin() {
    return function install(openmct) {
        openmct.objectViews.addProvider(new ConditionWidgetViewProvider(openmct));

        openmct.types.addType('conditionWidget', {
            key: 'conditionWidget',
            name: "Condition Widget",
            description: "A button that can be used on its own, or dynamically styled with a Condition Set.",
            creatable: true,
            cssClass: 'icon-condition-widget',
            initialize(domainObject) {
                domainObject.configuration = {};
                domainObject.label = 'Condition Widget';
                domainObject.conditionalLabel = '';
            },
            form: [
                {
                    "key": "label",
                    "name": "Label",
                    "control": "textfield",
                    property: [
                        "label"
                    ],
                    "required": true,
                    "cssClass": "l-input"
                },
                {
                    "key": "url",
                    "name": "URL",
                    "control": "textfield",
                    "required": false,
                    "cssClass": "l-input-lg"
                }
            ]
        });
    };
}
