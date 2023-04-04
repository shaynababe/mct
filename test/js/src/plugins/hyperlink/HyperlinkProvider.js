/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import HyperlinkLayout from './HyperlinkLayout.vue';
import Vue from 'vue';

export default function HyperlinkProvider(openmct) {

    return {
        key: 'hyperlink.view',
        name: 'Hyperlink',
        cssClass: 'icon-chain-links',
        canView(domainObject) {
            return domainObject.type === 'hyperlink';
        },

        view: function (domainObject) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            HyperlinkLayout
                        },
                        provide: {
                            domainObject
                        },
                        template: '<hyperlink-layout></hyperlink-layout>'
                    });
                },
                destroy: function () {
                    component.$destroy();
                    component = undefined;
                }
            };
        }
    };
}
