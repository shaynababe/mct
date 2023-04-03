/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import Plot from '../Plot.vue';
import Vue from 'vue';

export default function OverlayPlotViewProvider(openmct) {
    function isCompactView(objectPath) {
        let isChildOfTimeStrip = objectPath.find(object => object.type === 'time-strip');

        return isChildOfTimeStrip && !openmct.router.isNavigatedObject(objectPath);
    }

    return {
        key: 'plot-overlay',
        name: 'Overlay Plot',
        cssClass: 'icon-telemetry',
        canView(domainObject, objectPath) {
            return domainObject.type === 'telemetry.plot.overlay';
        },

        canEdit(domainObject, objectPath) {
            return domainObject.type === 'telemetry.plot.overlay';
        },

        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {
                    let isCompact = isCompactView(objectPath);
                    component = new Vue({
                        el: element,
                        components: {
                            Plot
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
                        template: '<plot ref="plotComponent" :options="options"></plot>'
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
