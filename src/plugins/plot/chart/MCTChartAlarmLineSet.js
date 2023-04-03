/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import eventHelpers from '../lib/eventHelpers';

export default class MCTChartAlarmLineSet {
    /**
     * @param {Bounds} bounds
     */
    constructor(series, chart, offset, bounds) {
        this.series = series;
        this.chart = chart;
        this.offset = offset;
        this.bounds = bounds;
        this.limits = [];

        eventHelpers.extend(this);
        this.listenTo(series, 'limitBounds', this.updateBounds, this);
        this.listenTo(series, 'limits', this.getLimitPoints, this);
        this.listenTo(series, 'change:xKey', this.getLimitPoints, this);

        if (series.limits) {
            this.getLimitPoints(series);
        }
    }

    /**
     * @param {Bounds} bounds
     */
    updateBounds(bounds) {
        this.bounds = bounds;
        this.getLimitPoints(this.series);
    }

    color() {
        return this.series.get('color');
    }

    name() {
        return this.series.get('name');
    }

    makePoint(point, series) {
        if (!this.offset.xVal) {
            this.chart.setOffset(point, undefined, series);
        }

        return {
            x: this.offset.xVal(point, series),
            y: this.offset.yVal(point, series)
        };
    }

    getLimitPoints(series) {
        this.limits = [];
        let xKey = series.get('xKey');
        Object.keys(series.limits).forEach((key) => {
            const limitForLevel = series.limits[key];
            if (limitForLevel.high) {
                this.limits.push({
                    seriesKey: series.keyString,
                    level: key.toLowerCase(),
                    name: this.name(),
                    seriesColor: series.get('color').asHexString(),
                    point: this.makePoint(Object.assign({ [xKey]: this.bounds.start }, limitForLevel.high), series),
                    value: series.getYVal(limitForLevel.high),
                    color: limitForLevel.high.color,
                    isUpper: true
                });
            }

            if (limitForLevel.low) {
                this.limits.push({
                    seriesKey: series.keyString,
                    level: key.toLowerCase(),
                    name: this.name(),
                    seriesColor: series.get('color').asHexString(),
                    point: this.makePoint(Object.assign({ [xKey]: this.bounds.start }, limitForLevel.low), series),
                    value: series.getYVal(limitForLevel.low),
                    color: limitForLevel.low.color,
                    isUpper: false
                });
            }
        }, this);
    }

    reset() {
        this.limits = [];
        if (this.series.limits) {
            this.getLimitPoints(this.series);
        }
    }

    destroy() {
        this.stopListening();
    }

}

/**
@typedef {import('@/api/time/TimeContext').Bounds} Bounds
*/
