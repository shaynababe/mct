
/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import ClockViewProvider from './ClockViewProvider';
import ClockIndicator from './components/ClockIndicator.vue';

import momentTimezone from 'moment-timezone';
import Vue from 'vue';

export default function ClockPlugin(options) {
    return function install(openmct) {
        const CLOCK_INDICATOR_FORMAT = 'YYYY/MM/DD HH:mm:ss';
        openmct.types.addType('clock', {
            name: 'Clock',
            description: 'A digital clock that uses system time and supports a variety of display formats and timezones.',
            creatable: true,
            cssClass: 'icon-clock',
            initialize: function (domainObject) {
                domainObject.configuration = {
                    baseFormat: 'YYYY/MM/DD hh:mm:ss',
                    use24: 'clock12',
                    timezone: 'UTC'
                };
            },
            "form": [
                {
                    "key": "displayFormat",
                    "name": "Display Format",
                    control: 'select',
                    options: [
                        {
                            value: 'YYYY/MM/DD hh:mm:ss',
                            name: 'YYYY/MM/DD hh:mm:ss'
                        },
                        {
                            value: 'YYYY/DDD hh:mm:ss',
                            name: 'YYYY/DDD hh:mm:ss'
                        },
                        {
                            value: 'hh:mm:ss',
                            name: 'hh:mm:ss'
                        }
                    ],
                    cssClass: 'l-inline',
                    property: [
                        'configuration',
                        'baseFormat'
                    ]
                },
                {
                    ariaLabel: "12 or 24 hour clock",
                    control: 'select',
                    options: [
                        {
                            value: 'clock12',
                            name: '12hr'
                        },
                        {
                            value: 'clock24',
                            name: '24hr'
                        }
                    ],
                    cssClass: 'l-inline',
                    property: [
                        'configuration',
                        'use24'
                    ]
                },
                {
                    "key": "timezone",
                    "name": "Timezone",
                    "control": "autocomplete",
                    "cssClass": "c-clock__timezone-selection c-menu--no-icon",
                    "options": momentTimezone.tz.names(),
                    property: [
                        'configuration',
                        'timezone'
                    ]
                }
            ]
        });
        openmct.objectViews.addProvider(new ClockViewProvider(openmct));

        if (options && options.enableClockIndicator === true) {
            const clockIndicator = new Vue ({
                components: {
                    ClockIndicator
                },
                provide: {
                    openmct
                },
                data() {
                    return {
                        indicatorFormat: CLOCK_INDICATOR_FORMAT
                    };
                },
                template: '<ClockIndicator :indicator-format="indicatorFormat" />'
            });
            const indicator = {
                element: clockIndicator.$mount().$el,
                key: 'clock-indicator',
                priority: openmct.priority.LOW
            };

            openmct.indicators.add(indicator);
        }

        openmct.objects.addGetInterceptor({
            appliesTo: (identifier, domainObject) => {
                return domainObject && domainObject.type === 'clock';
            },
            invoke: (identifier, domainObject) => {
                if (domainObject.configuration) {
                    return domainObject;
                }

                if (domainObject.clockFormat
                    && domainObject.timezone) {
                    const baseFormat = domainObject.clockFormat[0];
                    const use24 = domainObject.clockFormat[1];
                    const timezone = domainObject.timezone;

                    domainObject.configuration = {
                        baseFormat,
                        use24,
                        timezone
                    };

                    openmct.objects.mutate(domainObject, 'configuration', domainObject.configuration);
                }

                return domainObject;
            }
        });

    };
}
