/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import EventTelmetryProvider from './EventTelemetryProvider';
import EventMetadataProvider from './EventMetadataProvider';

export default function EventGeneratorPlugin(options) {
    return function install(openmct) {
        openmct.types.addType("eventGenerator", {
            name: "Event Message Generator",
            description: "For development use. Creates sample event message data that mimics a live data stream.",
            cssClass: "icon-generator-events",
            creatable: true,
            initialize: function (object) {
                object.telemetry = {
                    duration: 5
                };
            }
        });
        openmct.telemetry.addProvider(new EventTelmetryProvider());
        openmct.telemetry.addProvider(new EventMetadataProvider());

    };
}
