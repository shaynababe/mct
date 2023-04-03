/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import PlotViewProvider from './PlotViewProvider';
import OverlayPlotViewProvider from './overlayPlot/OverlayPlotViewProvider';
import StackedPlotViewProvider from './stackedPlot/StackedPlotViewProvider';
import PlotsInspectorViewProvider from './inspector/PlotsInspectorViewProvider';
import OverlayPlotCompositionPolicy from './overlayPlot/OverlayPlotCompositionPolicy';
import StackedPlotCompositionPolicy from './stackedPlot/StackedPlotCompositionPolicy';
import PlotViewActions from "./actions/ViewActions";
import StackedPlotsInspectorViewProvider from "./inspector/StackedPlotsInspectorViewProvider";
import stackedPlotConfigurationInterceptor from "./stackedPlot/stackedPlotConfigurationInterceptor";

export default function () {
    return function install(openmct) {

        openmct.types.addType('telemetry.plot.overlay', {
            key: "telemetry.plot.overlay",
            name: "Overlay Plot",
            cssClass: "icon-plot-overlay",
            description: "Combine multiple telemetry elements and view them together as a plot with common X and Y axes. Can be added to Display Layouts.",
            creatable: true,
            initialize: function (domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    //series is an array of objects of type: {identifier, series: {color...}, yAxis:{}}
                    series: []
                };
            },
            priority: 891
        });

        openmct.types.addType('telemetry.plot.stacked', {
            key: "telemetry.plot.stacked",
            name: "Stacked Plot",
            cssClass: "icon-plot-stacked",
            description: "Combine multiple telemetry elements and view them together as a plot with a common X axis and individual Y axes. Can be added to Display Layouts.",
            creatable: true,
            initialize: function (domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    series: [],
                    yAxis: {},
                    xAxis: {}
                };
            },
            priority: 890
        });

        stackedPlotConfigurationInterceptor(openmct);

        openmct.objectViews.addProvider(new StackedPlotViewProvider(openmct));
        openmct.objectViews.addProvider(new OverlayPlotViewProvider(openmct));
        openmct.objectViews.addProvider(new PlotViewProvider(openmct));

        openmct.inspectorViews.addProvider(new PlotsInspectorViewProvider(openmct));
        openmct.inspectorViews.addProvider(new StackedPlotsInspectorViewProvider(openmct));

        openmct.composition.addPolicy(new OverlayPlotCompositionPolicy(openmct).allow);
        openmct.composition.addPolicy(new StackedPlotCompositionPolicy(openmct).allow);

        PlotViewActions.forEach(action => {
            openmct.actions.register(action);
        });
    };
}
