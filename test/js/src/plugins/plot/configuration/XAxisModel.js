/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import Model from './Model';

/**
 * @extends {Model<XAxisModelType, XAxisModelOptions>}
 */
export default class XAxisModel extends Model {
    // Despite providing template types to the Model class, we still need to
    // re-define the type of the following initialize() method's options arg. Tracking
    // issue for this: https://github.com/microsoft/TypeScript/issues/32082
    // When they fix it, we can remove the `@param` we have here.
    /**
     * @override
     * @param {import('./Model').ModelOptions<XAxisModelType, XAxisModelOptions>} options
     */
    initialize(options) {
        this.plot = options.plot;

        // This is a type assertion for TypeScript, this error is not thrown in practice.
        if (!options.model) {
            throw new Error('Not a collection model.');
        }

        this.set('label', options.model.name || '');

        this.on('change:range', (newValue) => {
            if (!this.get('frozen')) {
                this.set('displayRange', newValue);
            }
        });

        this.on('change:frozen', (frozen) => {
            if (!frozen) {
                this.set('range', this.get('range'));
            }
        });

        if (this.get('range')) {
            this.set('range', this.get('range'));
        }

        this.listenTo(this, 'change:key', this.changeKey, this);
    }

    /**
     * @param {string} newKey
     */
    changeKey(newKey) {
        const series = this.plot.series.first();
        if (series) {
            const xMetadata = series.metadata.value(newKey);
            const xFormat = series.formats[newKey];
            this.set('label', xMetadata.name);
            this.set('format', xFormat.format.bind(xFormat));
        } else {
            this.set('format', function (x) {
                return x;
            });
            this.set('label', newKey);
        }

        this.plot.series.forEach(function (plotSeries) {
            plotSeries.set('xKey', newKey);
        });
    }
    resetSeries() {
        this.plot.series.forEach(function (plotSeries) {
            plotSeries.reset();
        });
    }
    /**
     * @param {import('./Model').ModelOptions<XAxisModelType, XAxisModelOptions>} options
     * @override
     */
    defaultModel(options) {
        const bounds = options.openmct.time.bounds();
        const timeSystem = options.openmct.time.timeSystem();
        const format = options.openmct.telemetry.getFormatter(timeSystem.timeFormat);

        /** @type {XAxisModelType} */
        const defaultModel = {
            name: timeSystem.name,
            key: timeSystem.key,
            format: format.format.bind(format),
            range: {
                min: bounds.start,
                max: bounds.end
            },
            frozen: false
        };

        return defaultModel;
    }
}

/** @typedef {any} TODO */

/** @typedef {TODO} OpenMCT */

/**
@typedef {{
    min: number
    max: number
}} NumberRange
*/

/**
@typedef {import("./Model").ModelType<{
    range?: NumberRange
    displayRange: NumberRange
    frozen: boolean
    label: string
    format: (n: number) => string
    values: Array<TODO>
}>} AxisModelType
*/

/**
@typedef {AxisModelType & {
    name: string
    key: string
}} XAxisModelType
*/

/**
@typedef {{
    plot: import('./PlotConfigurationModel').default
}} XAxisModelOptions
*/
