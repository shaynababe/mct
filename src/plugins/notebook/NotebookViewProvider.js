/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import Vue from 'vue';
import Notebook from './components/Notebook.vue';
import Agent from '@/utils/agent/Agent';

export default class NotebookViewProvider {
    constructor(openmct, name, key, type, cssClass, snapshotContainer, entryUrlWhitelist) {
        this.openmct = openmct;
        this.key = key;
        this.name = `${name} View`;
        this.type = type;
        this.cssClass = cssClass;
        this.snapshotContainer = snapshotContainer;
        this.entryUrlWhitelist = entryUrlWhitelist;
    }

    canView(domainObject) {
        return domainObject.type === this.type;
    }

    view(domainObject) {
        let component;
        let openmct = this.openmct;
        let snapshotContainer = this.snapshotContainer;
        let agent = new Agent(window);
        let entryUrlWhitelist = this.entryUrlWhitelist;

        return {
            show(container) {
                component = new Vue({
                    el: container,
                    components: {
                        Notebook
                    },
                    provide: {
                        openmct,
                        snapshotContainer,
                        agent,
                        entryUrlWhitelist
                    },
                    data() {
                        return {
                            domainObject
                        };
                    },
                    template: '<Notebook :domain-object="domainObject"></Notebook>'
                });
            },
            destroy() {
                component.$destroy();
            }
        };
    }
}
