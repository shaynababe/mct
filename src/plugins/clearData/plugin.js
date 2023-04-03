/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './components/globalClearIndicator.vue',
    './ClearDataAction',
    'vue'
], function (
    GlobaClearIndicator,
    ClearDataAction,
    Vue
) {
    return function plugin(appliesToObjects, options = {indicator: true}) {
        let installIndicator = options.indicator;

        appliesToObjects = appliesToObjects || [];

        return function install(openmct) {
            if (installIndicator) {
                let component = new Vue ({
                    components: {
                        GlobalClearIndicator: GlobaClearIndicator.default
                    },
                    provide: {
                        openmct
                    },
                    template: '<GlobalClearIndicator></GlobalClearIndicator>'
                });

                let indicator = {
                    element: component.$mount().$el,
                    key: 'global-clear-indicator',
                    priority: openmct.priority.DEFAULT
                };

                openmct.indicators.add(indicator);
            }

            openmct.actions.register(new ClearDataAction.default(openmct, appliesToObjects));
        };
    };
});
