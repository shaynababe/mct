/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    'objectUtils',
    './components/table-configuration.vue',
    './TelemetryTableConfiguration',
    'vue'
], function (
    objectUtils,
    TableConfigurationComponent,
    TelemetryTableConfiguration,
    Vue
) {

    function TableConfigurationViewProvider(openmct) {
        return {
            key: 'table-configuration',
            name: 'Configuration',
            canView: function (selection) {
                if (selection.length !== 1 || selection[0].length === 0) {
                    return false;
                }

                let object = selection[0][0].context.item;

                return object && object.type === 'table';
            },
            view: function (selection) {
                let component;
                let domainObject = selection[0][0].context.item;
                let tableConfiguration = new TelemetryTableConfiguration(domainObject, openmct);

                return {
                    show: function (element) {
                        component = new Vue({
                            el: element,
                            components: {
                                TableConfiguration: TableConfigurationComponent.default
                            },
                            provide: {
                                openmct,
                                tableConfiguration
                            },
                            template: '<table-configuration></table-configuration>'
                        });
                    },
                    priority: function () {
                        return 1;
                    },
                    destroy: function () {
                        if (component) {
                            component.$destroy();
                            component = undefined;
                        }

                        tableConfiguration = undefined;
                    }
                };
            }
        };
    }

    return TableConfigurationViewProvider;
});
