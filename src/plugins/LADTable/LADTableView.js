/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import LadTable from './components/LADTable.vue';
import LADTableConfiguration from './LADTableConfiguration';
import Vue from 'vue';

export default class LADTableView {
    constructor(openmct, domainObject, objectPath) {
        this.openmct = openmct;
        this.domainObject = domainObject;
        this.objectPath = objectPath;
        this.component = undefined;
    }

    show(element) {
        let ladTableConfiguration = new LADTableConfiguration(this.domainObject, this.openmct);

        this.component = new Vue({
            el: element,
            components: {
                LadTable
            },
            provide: {
                openmct: this.openmct,
                currentView: this,
                ladTableConfiguration
            },
            data: () => {
                return {
                    domainObject: this.domainObject,
                    objectPath: this.objectPath
                };
            },
            template: '<lad-table ref="ladTable" :domain-object="domainObject" :object-path="objectPath"></lad-table>'
        });
    }

    getViewContext() {
        if (!this.component) {
            return {};
        }

        return this.component.$refs.ladTable.getViewContext();
    }

    destroy(element) {
        this.component.$destroy();
        this.component = undefined;
    }
}
