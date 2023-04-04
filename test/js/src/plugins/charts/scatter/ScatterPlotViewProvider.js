/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import ScatterPlotView from './ScatterPlotView.vue';
import { SCATTER_PLOT_KEY, SCATTER_PLOT_VIEW, TIME_STRIP_KEY } from './scatterPlotConstants.js';
import Vue from 'vue';

export default function ScatterPlotViewProvider(openmct) {
    function isCompactView(objectPath) {
        let isChildOfTimeStrip = objectPath.find(object => object.type === TIME_STRIP_KEY);

        return isChildOfTimeStrip && !openmct.router.isNavigatedObject(objectPath);
    }

    return {
        key: SCATTER_PLOT_VIEW,
        name: 'Scatter Plot',
        cssClass: 'icon-telemetry',
        canView(domainObject, objectPath) {
            return domainObject && domainObject.type === SCATTER_PLOT_KEY;
        },

        canEdit(domainObject, objectPath) {
            return domainObject && domainObject.type === SCATTER_PLOT_KEY;
        },

        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {
                    let isCompact = isCompactView(objectPath);
                    component = new Vue({
                        el: element,
                        components: {
                            ScatterPlotView
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
                        template: '<scatter-plot-view :options="options"></scatter-plot-view>'
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
