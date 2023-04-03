/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import StackedPlot from './StackedPlot.vue';
import Vue from 'vue';

export default function StackedPlotViewProvider(openmct) {
    function isCompactView(objectPath) {
        let isChildOfTimeStrip = objectPath.find(object => object.type === 'time-strip');

        return isChildOfTimeStrip && !openmct.router.isNavigatedObject(objectPath);
    }

    return {
        key: 'plot-stacked',
        name: 'Stacked Plot',
        cssClass: 'icon-telemetry',
        canView(domainObject, objectPath) {
            return domainObject.type === 'telemetry.plot.stacked';
        },

        canEdit(domainObject, objectPath) {
            return domainObject.type === 'telemetry.plot.stacked';
        },

        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {
                    let isCompact = isCompactView(objectPath);

                    component = new Vue({
                        el: element,
                        components: {
                            StackedPlot
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
                        template: '<stacked-plot ref="plotComponent" :options="options"></stacked-plot>'
                    });
                },
                getViewContext() {
                    if (!component) {
                        return {};
                    }

                    return component.$refs.plotComponent.getViewContext();
                },
                destroy: function () {
                    component.$destroy();
                    component = undefined;
                }
            };
        }
    };
}
