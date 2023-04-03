/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import BarGraphView from './BarGraphView.vue';
import { BAR_GRAPH_KEY, BAR_GRAPH_VIEW } from './BarGraphConstants';
import Vue from 'vue';

export default function BarGraphViewProvider(openmct) {
    function isCompactView(objectPath) {
        let isChildOfTimeStrip = objectPath.find(object => object.type === 'time-strip');

        return isChildOfTimeStrip && !openmct.router.isNavigatedObject(objectPath);
    }

    return {
        key: BAR_GRAPH_VIEW,
        name: 'Bar Graph',
        cssClass: 'icon-telemetry',
        canView(domainObject, objectPath) {
            return domainObject && domainObject.type === BAR_GRAPH_KEY;
        },

        canEdit(domainObject, objectPath) {
            return domainObject && domainObject.type === BAR_GRAPH_KEY;
        },

        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {
                    let isCompact = isCompactView(objectPath);
                    component = new Vue({
                        el: element,
                        components: {
                            BarGraphView
                        },
                        provide: {
                            openmct,
                            domainObject,
                            path: objectPath
                        },
                        data() {
                            return {
                                options: {
                                    compact: isCompact
                                }
                            };
                        },
                        template: '<bar-graph-view ref="graphComponent" :options="options"></bar-graph-view>'
                    });
                },
                destroy: function () {
                    component.$destroy();
                    component = undefined;
                },
                onClearData() {
                    component.$refs.graphComponent.refreshData();
                }
            };
        }
    };
}
