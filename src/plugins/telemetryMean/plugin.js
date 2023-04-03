/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define(['./src/MeanTelemetryProvider'], function (MeanTelemetryProvider) {
    const DEFAULT_SAMPLES = 10;

    function plugin() {
        return function install(openmct) {
            openmct.types.addType('telemetry-mean', {
                name: 'Telemetry Filter',
                description: 'Provides telemetry values that represent the mean of the last N values of a telemetry stream',
                creatable: true,
                cssClass: 'icon-telemetry',
                initialize: function (domainObject) {
                    domainObject.samples = DEFAULT_SAMPLES;
                    domainObject.telemetry = {};
                    domainObject.telemetry.values =
                        openmct.time.getAllTimeSystems().map(function (timeSystem, index) {
                            return {
                                key: timeSystem.key,
                                name: timeSystem.name,
                                hints: {
                                    domain: index + 1
                                }
                            };
                        });
                    domainObject.telemetry.values.push({
                        key: "value",
                        name: "Value",
                        hints: {
                            range: 1
                        }
                    });
                },
                form: [
                    {
                        "key": "telemetryPoint",
                        "name": "Telemetry Point",
                        "control": "textfield",
                        "required": true,
                        "cssClass": "l-input-lg"
                    },
                    {
                        "key": "samples",
                        "name": "Samples to Average",
                        "control": "textfield",
                        "required": true,
                        "cssClass": "l-input-sm"
                    }
                ]
            });
            openmct.telemetry.addProvider(new MeanTelemetryProvider(openmct));
        };
    }

    return plugin;
});
