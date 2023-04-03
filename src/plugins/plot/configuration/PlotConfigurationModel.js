/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import _ from 'lodash';

import Model from "./Model";
import SeriesCollection from "./SeriesCollection";
import XAxisModel from "./XAxisModel";
import YAxisModel from "./YAxisModel";
import LegendModel from "./LegendModel";

const MAX_Y_AXES = 3;
const MAIN_Y_AXES_ID = 1;
const MAX_ADDITIONAL_AXES = MAX_Y_AXES - 1;

/**
 * PlotConfiguration model stores the configuration of a plot and some
 * limited state.  The individual parts of the plot configuration model
 * handle setting defaults and updating in response to various changes.
 *
 * @extends {Model<PlotConfigModelType, PlotConfigModelOptions>}
 */
export default class PlotConfigurationModel extends Model {
    /**
     * Initializes all sub models and then passes references to submodels
     * to those that need it.
     *
     * @override
     * @param {import('./Model').ModelOptions<PlotConfigModelType, PlotConfigModelOptions>} options
     */
    initialize(options) {
        this.openmct = options.openmct;

        // This is a type assertion for TypeScript, this error is never thrown in practice.
        if (!options.model) {
            throw new Error('Not a collection model.');
        }

        this.xAxis = new XAxisModel({
            model: options.model.xAxis,
            plot: this,
            openmct: options.openmct
        });
        this.yAxis = new YAxisModel({
            model: options.model.yAxis,
            plot: this,
            openmct: options.openmct,
            id: options.model.yAxis.id || MAIN_Y_AXES_ID
        });
        //Add any axes in addition to the main yAxis above - we must always have at least 1 y-axis
        //Addition axes ids will be the MAIN_Y_AXES_ID + x where x is between 1 and MAX_ADDITIONAL_AXES
        this.additionalYAxes = [];
        const hasAdditionalAxesConfiguration = Array.isArray(options.model.additionalYAxes);

        for (let yAxisCount = 0; yAxisCount < MAX_ADDITIONAL_AXES; yAxisCount++) {
            const yAxisId = MAIN_Y_AXES_ID + yAxisCount + 1;
            const yAxis = hasAdditionalAxesConfiguration && options.model.additionalYAxes.find(additionalYAxis => additionalYAxis?.id === yAxisId);
            if (yAxis) {
                this.additionalYAxes.push(new YAxisModel({
                    model: yAxis,
                    plot: this,
                    openmct: options.openmct,
                    id: yAxis.id
                }));
            } else {
                this.additionalYAxes.push(new YAxisModel({
                    plot: this,
                    openmct: options.openmct,
                    id: yAxisId
                }));
            }
        }
        // end add additional axes

        this.legend = new LegendModel({
            model: options.model.legend,
            plot: this,
            openmct: options.openmct
        });
        this.series = new SeriesCollection({
            models: options.model.series,
            plot: this,
            openmct: options.openmct,
            palette: options.palette
        });

        if (this.get('domainObject').type === 'telemetry.plot.overlay') {
            this.removeMutationListener = this.openmct.objects.observe(
                this.get('domainObject'),
                '*',
                this.updateDomainObject.bind(this)
            );
        }

        this.yAxis.listenToSeriesCollection(this.series);
        this.additionalYAxes.forEach(yAxis => {
            yAxis.listenToSeriesCollection(this.series);
        });
        this.legend.listenToSeriesCollection(this.series);

        this.listenTo(this, 'destroy', this.onDestroy, this);
    }
    /**
     * Retrieve the persisted series config for a given identifier.
     * @param {import('./PlotSeries').Identifier} identifier
     * @returns {import('./PlotSeries').PlotSeriesModelType=}
     */
    getPersistedSeriesConfig(identifier) {
        const domainObject = this.get('domainObject');
        if (!domainObject.configuration || !domainObject.configuration.series) {
            return;
        }

        return domainObject.configuration.series.filter(function (seriesConfig) {
            return seriesConfig.identifier.key === identifier.key
                    && seriesConfig.identifier.namespace === identifier.namespace;
        })[0];
    }
    /**
     * Retrieve the persisted filters for a given identifier.
     */
    getPersistedFilters(identifier) {
        const domainObject = this.get('domainObject');
        const keystring = this.openmct.objects.makeKeyString(identifier);

        if (!domainObject.configuration || !domainObject.configuration.filters) {
            return;
        }

        return domainObject.configuration.filters[keystring];
    }
    /**
     * Update the domain object with the given value.
     */
    updateDomainObject(domainObject) {
        this.set('domainObject', domainObject);
    }

    /**
     * Clean up all objects and remove all listeners.
     */
    onDestroy() {
        this.xAxis.destroy();
        this.yAxis.destroy();
        this.series.destroy();
        this.legend.destroy();
        if (this.removeMutationListener) {
            this.removeMutationListener();
        }
    }
    /**
     * Return defaults, which are extracted from the passed in domain
     * object.
     * @override
     * @param {import('./Model').ModelOptions<PlotConfigModelType, PlotConfigModelOptions>} options
     */
    defaultModel(options) {
        return {
            series: [],
            domainObject: options.domainObject,
            xAxis: {},
            yAxis: _.cloneDeep(options.domainObject.configuration?.yAxis ?? {}),
            additionalYAxes: _.cloneDeep(options.domainObject.configuration?.additionalYAxes ?? []),
            legend: _.cloneDeep(options.domainObject.configuration?.legend ?? {})
        };
    }
}

/** @typedef {any} TODO */

/** @typedef {import('./PlotSeries').default} PlotSeries */

/**
@typedef {{
    configuration: {
        series: import('./PlotSeries').PlotSeriesModelType[]
        yAxis: import('./YAxisModel').YAxisModelType
    },
}} SomeDomainObject_NeedsName
*/

/**
@typedef {{
    xAxis: import('./XAxisModel').XAxisModelType
    yAxis: import('./YAxisModel').YAxisModelType
    legend: TODO
    series: PlotSeries[]
    domainObject: SomeDomainObject_NeedsName
}} PlotConfigModelType
*/

/** @typedef {TODO} SomeOtherDomainObject */

/**
TODO: Is SomeOtherDomainObject the same domain object as with SomeDomainObject_NeedsName?
@typedef {{
    plot: import('./PlotConfigurationModel').default
    domainObject: SomeOtherDomainObject
}} PlotConfigModelOptions
*/
