/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import WebPageViewProvider from './WebPageViewProvider.js';

export default function plugin() {
    return function install(openmct) {
        openmct.objectViews.addProvider(new WebPageViewProvider(openmct));

        openmct.types.addType('webPage', {
            name: "Web Page",
            description: "Embed a web page or web-based image in a resizeable window component. Note that the URL being embedded must allow iframing.",
            creatable: true,
            cssClass: 'icon-page',
            form: [
                {
                    "key": "url",
                    "name": "URL",
                    "control": "textfield",
                    "required": true,
                    "cssClass": "l-input-lg"
                }
            ]
        });
    };
}
