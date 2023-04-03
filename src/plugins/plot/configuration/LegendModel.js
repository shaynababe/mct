/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import Model from "./Model";
/**
 * TODO: doc strings.
 */
export default class LegendModel extends Model {
    listenToSeriesCollection(seriesCollection) {
        this.seriesCollection = seriesCollection;
        this.listenTo(this.seriesCollection, 'add', this.setHeight, this);
        this.listenTo(this.seriesCollection, 'remove', this.setHeight, this);
        this.listenTo(this, 'change:expanded', this.setHeight, this);
        this.set('expanded', this.get('expandByDefault'));
    }

    setHeight() {
        const expanded = this.get('expanded');
        if (this.get('position') !== 'top') {
            this.set('height', '0px');
        } else {
            this.set('height', expanded ? (20 * (this.seriesCollection.size() + 1) + 40) + 'px' : '21px');
        }
    }

    /**
     * @override
     */
    defaultModel(options) {
        return {
            position: 'top',
            expandByDefault: false,
            hideLegendWhenSmall: false,
            valueToShowWhenCollapsed: 'nearestValue',
            showTimestampWhenExpanded: true,
            showValueWhenExpanded: true,
            showMaximumWhenExpanded: true,
            showMinimumWhenExpanded: true,
            showUnitsWhenExpanded: true
        };
    }
}
