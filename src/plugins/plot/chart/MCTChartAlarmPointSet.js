/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import eventHelpers from '../lib/eventHelpers';

export default class MCTChartAlarmPointSet {
    constructor(series, chart, offset) {
        this.series = series;
        this.chart = chart;
        this.offset = offset;
        this.points = [];

        eventHelpers.extend(this);

        this.listenTo(series, 'add', this.append, this);
        this.listenTo(series, 'remove', this.remove, this);
        this.listenTo(series, 'reset', this.reset, this);
        this.listenTo(series, 'destroy', this.destroy, this);

        this.series.getSeriesData().forEach(function (point, index) {
            this.append(point, index, series);
        }, this);
    }

    append(datum) {
        if (datum.mctLimitState) {
            this.points.push({
                x: this.offset.xVal(datum, this.series),
                y: this.offset.yVal(datum, this.series),
                datum: datum
            });
        }
    }

    remove(datum) {
        this.points = this.points.filter(function (p) {
            return p.datum !== datum;
        });
    }

    reset() {
        this.points = [];
    }

    destroy() {
        this.stopListening();
    }
}
