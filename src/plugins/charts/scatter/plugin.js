/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import { SCATTER_PLOT_KEY } from './scatterPlotConstants.js';
import ScatterPlotViewProvider from './ScatterPlotViewProvider';
import ScatterPlotInspectorViewProvider from './inspector/ScatterPlotInspectorViewProvider';
import ScatterPlotCompositionPolicy from './ScatterPlotCompositionPolicy';
import Vue from "vue";
import ScatterPlotForm from "./ScatterPlotForm.vue";

export default function () {
    return function install(openmct) {
        openmct.forms.addNewFormControl('scatter-plot-form-control', getScatterPlotFormControl(openmct));

        openmct.types.addType(SCATTER_PLOT_KEY, {
            key: SCATTER_PLOT_KEY,
            name: "Scatter Plot",
            cssClass: "icon-plot-scatter",
            description: "View data as a scatter plot.",
            creatable: true,
            initialize: function (domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    styles: {},
                    axes: {},
                    ranges: {}
                };
            },
            form: [
                {
                    name: 'Underlay data (JSON file)',
                    key: 'selectFile',
                    control: 'file-input',
                    text: 'Select File...',
                    type: 'application/json',
                    removable: true,
                    hideFromInspector: true,
                    property: [
                        "selectFile"
                    ]
                },
                {
                    name: "Underlay ranges",
                    control: "scatter-plot-form-control",
                    cssClass: "l-input",
                    key: "scatterPlotForm",
                    required: false,
                    hideFromInspector: false,
                    property: [
                        "configuration",
                        "ranges"
                    ],
                    validate: ({ value }, callback) => {
                        const { rangeMin, rangeMax, domainMin, domainMax } = value;
                        const valid = {
                            rangeMin,
                            rangeMax,
                            domainMin,
                            domainMax
                        };

                        if (callback) {
                            callback(valid);
                        }

                        const values = Object.values(valid);
                        const hasAllValues = values.every(rangeValue => rangeValue !== undefined);
                        const hasNoValues = values.every(rangeValue => rangeValue === undefined);

                        return hasAllValues || hasNoValues;
                    }
                }
            ],
            priority: 891
        });

        openmct.objectViews.addProvider(new ScatterPlotViewProvider(openmct));

        openmct.inspectorViews.addProvider(new ScatterPlotInspectorViewProvider(openmct));

        openmct.composition.addPolicy(new ScatterPlotCompositionPolicy(openmct).allow);
    };

    function getScatterPlotFormControl(openmct) {
        return {
            show(element, model, onChange) {
                const rowComponent = new Vue({
                    el: element,
                    components: {
                        ScatterPlotForm
                    },
                    provide: {
                        openmct
                    },
                    data() {
                        return {
                            model,
                            onChange
                        };
                    },
                    template: `<scatter-plot-form :model="model" @onChange="onChange"></scatter-plot-form>`
                });

                return rowComponent;
            }
        };
    }
}

