
/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import TimerViewProvider from './TimerViewProvider';

import PauseTimerAction from './actions/PauseTimerAction';
import RestartTimerAction from './actions/RestartTimerAction';
import StartTimerAction from './actions/StartTimerAction';
import StopTimerAction from './actions/StopTimerAction';

export default function TimerPlugin() {
    return function install(openmct) {
        openmct.types.addType('timer', {
            name: 'Timer',
            description: 'A timer that counts up or down to a datetime. Timers can be started, stopped and reset whenever needed, and support a variety of display formats. Each Timer displays the same value to all users. Timers can be added to Display Layouts.',
            creatable: true,
            cssClass: 'icon-timer',
            initialize: function (domainObject) {
                domainObject.configuration = {
                    timerFormat: 'long',
                    timestamp: undefined,
                    timezone: 'UTC',
                    timerState: undefined,
                    pausedTime: undefined
                };
            },
            "form": [
                {
                    "key": "timestamp",
                    "control": "datetime",
                    "name": "Target",
                    property: [
                        'configuration',
                        'timestamp'
                    ]
                },
                {
                    "key": "timerFormat",
                    "name": "Display Format",
                    "control": "select",
                    "options": [
                        {
                            "value": "long",
                            "name": "DDD hh:mm:ss"
                        },
                        {
                            "value": "short",
                            "name": "hh:mm:ss"
                        }
                    ],
                    property: [
                        'configuration',
                        'timerFormat'
                    ]
                }
            ]
        });
        openmct.objectViews.addProvider(new TimerViewProvider(openmct));

        openmct.actions.register(new PauseTimerAction(openmct));
        openmct.actions.register(new RestartTimerAction(openmct));
        openmct.actions.register(new StartTimerAction(openmct));
        openmct.actions.register(new StopTimerAction(openmct));

        openmct.objects.addGetInterceptor({
            appliesTo: (identifier, domainObject) => {
                return domainObject && domainObject.type === 'timer';
            },
            invoke: (identifier, domainObject) => {
                if (domainObject.configuration) {
                    return domainObject;
                }

                const configuration = {};

                if (domainObject.timerFormat) {
                    configuration.timerFormat = domainObject.timerFormat;
                }

                if (domainObject.timestamp) {
                    configuration.timestamp = domainObject.timestamp;
                }

                if (domainObject.timerState) {
                    configuration.timerState = domainObject.timerState;
                }

                if (domainObject.pausedTime) {
                    configuration.pausedTime = domainObject.pausedTime;
                }

                openmct.objects.mutate(domainObject, 'configuration', configuration);

                return domainObject;
            }
        });

    };
}
