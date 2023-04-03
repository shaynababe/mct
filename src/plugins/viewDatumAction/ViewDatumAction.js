/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import MetadataListView from './components/MetadataList.vue';
import Vue from 'vue';

export default class ViewDatumAction {
    constructor(openmct) {
        this.name = 'View Full Datum';
        this.key = 'viewDatumAction';
        this.description = 'View full value of datum received';
        this.cssClass = 'icon-object';

        this._openmct = openmct;
    }
    invoke(objectPath, view) {
        let viewContext = view.getViewContext && view.getViewContext();
        const row = viewContext.row;
        let attributes = row.getDatum && row.getDatum();
        let component = new Vue ({
            components: {
                MetadataListView
            },
            provide: {
                name: this.name,
                attributes
            },
            template: '<MetadataListView />'
        });

        this._openmct.overlays.overlay({
            element: component.$mount().$el,
            size: 'large',
            dismissable: true,
            onDestroy: () => {
                component.$destroy();
            }
        });
    }
    appliesTo(objectPath, view = {}) {
        let viewContext = (view.getViewContext && view.getViewContext()) || {};
        const row = viewContext.row;
        if (!row) {
            return false;
        }

        let datum = row.getDatum;
        let enabled = row.viewDatumAction;
        if (enabled && datum) {
            return true;
        }

        return false;
    }
}
