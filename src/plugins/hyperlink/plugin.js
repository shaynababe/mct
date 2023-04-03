/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import HyperlinkProvider from './HyperlinkProvider';

export default function () {
    return function install(openmct) {
        openmct.types.addType('hyperlink', {
            name: 'Hyperlink',
            key: 'hyperlink',
            description: 'A text element or button that links to any URL including Open MCT views.',
            creatable: true,
            cssClass: 'icon-chain-links',
            initialize: function (domainObject) {
                domainObject.displayFormat = "link";
                domainObject.linkTarget = "_self";
            },
            form: [
                {
                    "key": "url",
                    "name": "URL",
                    "control": "textfield",
                    "required": true,
                    "cssClass": "l-input-lg"
                },
                {
                    "key": "displayText",
                    "name": "Text to Display",
                    "control": "textfield",
                    "required": true,
                    "cssClass": "l-input-lg"
                },
                {
                    "key": "displayFormat",
                    "name": "Display Format",
                    "control": "select",
                    "options": [
                        {
                            "name": "Link",
                            "value": "link"
                        },
                        {
                            "name": "Button",
                            "value": "button"
                        }
                    ],
                    "cssClass": "l-inline"
                },
                {
                    "key": "linkTarget",
                    "name": "Tab to Open Hyperlink",
                    "control": "select",
                    "options": [
                        {
                            "name": "Open in this tab",
                            "value": "_self"
                        },
                        {
                            "name": "Open in a new tab",
                            "value": "_blank"
                        }
                    ],
                    "cssClass": "l-inline"

                }
            ]
        });
        openmct.objectViews.addProvider(new HyperlinkProvider(openmct));
    };
}
