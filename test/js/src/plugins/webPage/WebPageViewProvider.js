/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import WebPageComponent from './components/WebPage.vue';
import Vue from 'vue';

export default function WebPage(openmct) {
    return {
        key: 'webPage',
        name: 'Web Page',
        cssClass: 'icon-page',
        canView: function (domainObject) {
            return domainObject.type === 'webPage';
        },
        view: function (domainObject) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            WebPageComponent: WebPageComponent
                        },
                        provide: {
                            openmct,
                            domainObject
                        },
                        template: '<web-page-component></web-page-component>'
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
