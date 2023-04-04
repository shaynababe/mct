/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import GeneratorProvider from "./GeneratorProvider";
import SinewaveLimitProvider from "./SinewaveLimitProvider";
import SinewaveStalenessProvider from "./SinewaveStalenessProvider";
import StateGeneratorProvider from "./StateGeneratorProvider";
import GeneratorMetadataProvider from "./GeneratorMetadataProvider";

export default function (openmct) {

    openmct.types.addType("example.state-generator", {
        name: "State Generator",
        description: "For development use. Generates example enumerated telemetry by cycling through a given set of states.",
        cssClass: "icon-generator-telemetry",
        creatable: true,
        form: [
            {
                name: "State Duration (seconds)",
                control: "numberfield",
                cssClass: "l-input-sm l-numeric",
                key: "duration",
                required: true,
                property: [
                    "telemetry",
                    "duration"
                ]
            }
        ],
        initialize: function (object) {
            object.telemetry = {
                duration: 5
            };
        }
    });

    openmct.telemetry.addProvider(new StateGeneratorProvider());

    openmct.types.addType("generator", {
        name: "Sine Wave Generator",
        description: "For development use. Generates example streaming telemetry data using a simple sine wave algorithm.",
        cssClass: "icon-generator-telemetry",
        creatable: true,
        form: [
            {
                name: "Period",
                control: "numberfield",
                cssClass: "l-input-sm l-numeric",
                key: "period",
                required: true,
                property: [
                    "telemetry",
                    "period"
                ]
            },
            {
                name: "Amplitude",
                control: "numberfield",
                cssClass: "l-numeric",
                key: "amplitude",
                required: true,
                property: [
                    "telemetry",
                    "amplitude"
                ]
            },
            {
                name: "Offset",
                control: "numberfield",
                cssClass: "l-numeric",
                key: "offset",
                required: true,
                property: [
                    "telemetry",
                    "offset"
                ]
            },
            {
                name: "Data Rate (hz)",
                control: "numberfield",
                cssClass: "l-input-sm l-numeric",
                key: "dataRateInHz",
                required: true,
                property: [
                    "telemetry",
                    "dataRateInHz"
                ]
            },
            {
                name: "Phase (radians)",
                control: "numberfield",
                cssClass: "l-input-sm l-numeric",
                key: "phase",
                required: true,
                property: [
                    "telemetry",
                    "phase"
                ]
            },
            {
                name: "Randomness",
                control: "numberfield",
                cssClass: "l-input-sm l-numeric",
                key: "randomness",
                required: true,
                property: [
                    "telemetry",
                    "randomness"
                ]
            },
            {
                name: "Loading Delay (ms)",
                control: "numberfield",
                cssClass: "l-input-sm l-numeric",
                key: "loadDelay",
                required: true,
                property: [
                    "telemetry",
                    "loadDelay"
                ]
            },
            {
                name: "Include Infinity Values",
                control: "toggleSwitch",
                cssClass: "l-input",
                key: "infinityValues",
                property: [
                    "telemetry",
                    "infinityValues"
                ]
            },
            {
                name: "Provide Staleness Updates",
                control: "toggleSwitch",
                cssClass: "l-input",
                key: "staleness",
                property: [
                    "telemetry",
                    "staleness"
                ]
            }
        ],
        initialize: function (object) {
            object.telemetry = {
                period: 10,
                amplitude: 1,
                offset: 0,
                dataRateInHz: 1,
                phase: 0,
                randomness: 0,
                loadDelay: 0,
                infinityValues: false,
                staleness: false
            };
        }
    });
    const stalenessProvider = new SinewaveStalenessProvider(openmct);

    openmct.telemetry.addProvider(new GeneratorProvider(openmct, stalenessProvider));
    openmct.telemetry.addProvider(new GeneratorMetadataProvider());
    openmct.telemetry.addProvider(new SinewaveLimitProvider());
    openmct.telemetry.addProvider(stalenessProvider);
}
