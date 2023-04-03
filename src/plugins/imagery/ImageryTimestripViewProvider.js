/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import ImageryTimeView from './components/ImageryTimeView.vue';
import Vue from "vue";

export default function ImageryTimestripViewProvider(openmct) {
    const type = 'example.imagery.time-strip.view';

    function hasImageTelemetry(domainObject) {
        const metadata = openmct.telemetry.getMetadata(domainObject);
        if (!metadata) {
            return false;
        }

        return metadata.valuesForHints(['image']).length > 0;
    }

    return {
        key: type,
        name: 'Imagery Timestrip View',
        cssClass: 'icon-image',
        canView: function (domainObject, objectPath) {
            let isChildOfTimeStrip = objectPath.find(object => object.type === 'time-strip');

            return hasImageTelemetry(domainObject) && isChildOfTimeStrip && !openmct.router.isNavigatedObject(objectPath);
        },
        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            ImageryTimeView
                        },
                        provide: {
                            openmct: openmct,
                            domainObject: domainObject,
                            objectPath: objectPath
                        },
                        template: '<imagery-time-view></imagery-time-view>'

                    });
                },

                destroy: function () {
                    component.$destroy();
                    component = undefined;
                },

                getComponent() {
                    return component;
                }
            };
        }
    };
}
