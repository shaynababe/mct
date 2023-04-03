/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './AutoflowTabularController',
    './AutoflowTabularConstants',
    './VueView',
    './autoflow-tabular.html'
], function (
    AutoflowTabularController,
    AutoflowTabularConstants,
    VueView,
    autoflowTemplate
) {
    const ROW_HEIGHT = AutoflowTabularConstants.ROW_HEIGHT;
    const SLIDER_HEIGHT = AutoflowTabularConstants.SLIDER_HEIGHT;
    const INITIAL_COLUMN_WIDTH = AutoflowTabularConstants.INITIAL_COLUMN_WIDTH;
    const MAX_COLUMN_WIDTH = AutoflowTabularConstants.MAX_COLUMN_WIDTH;
    const COLUMN_WIDTH_STEP = AutoflowTabularConstants.COLUMN_WIDTH_STEP;

    /**
     * Implements the Autoflow Tabular view of a domain object.
     */
    function AutoflowTabularView(domainObject, openmct) {
        const data = {
            items: [],
            columns: [],
            width: INITIAL_COLUMN_WIDTH,
            filter: "",
            updated: "No updates",
            rowCount: 1
        };
        const controller =
            new AutoflowTabularController(domainObject, data, openmct);
        let interval;

        VueView.call(this, {
            data: data,
            methods: {
                increaseColumnWidth: function () {
                    data.width += COLUMN_WIDTH_STEP;
                    data.width = data.width > MAX_COLUMN_WIDTH
                        ? INITIAL_COLUMN_WIDTH : data.width;
                },
                reflow: function () {
                    let column = [];
                    let index = 0;
                    const filteredItems =
                        data.items.filter(function (item) {
                            return item.name.toLowerCase()
                                .indexOf(data.filter.toLowerCase()) !== -1;
                        });

                    data.columns = [];

                    while (index < filteredItems.length) {
                        if (column.length >= data.rowCount) {
                            data.columns.push(column);
                            column = [];
                        }

                        column.push(filteredItems[index]);
                        index += 1;
                    }

                    if (column.length > 0) {
                        data.columns.push(column);
                    }
                }
            },
            watch: {
                filter: 'reflow',
                items: 'reflow',
                rowCount: 'reflow'
            },
            template: autoflowTemplate,
            destroyed: function () {
                controller.destroy();

                if (interval) {
                    clearInterval(interval);
                    interval = undefined;
                }
            },
            mounted: function () {
                controller.activate();

                const updateRowHeight = function () {
                    const tabularArea = this.$refs.autoflowItems;
                    const height = tabularArea ? tabularArea.clientHeight : 0;
                    const available = height - SLIDER_HEIGHT;
                    const rows = Math.max(1, Math.floor(available / ROW_HEIGHT));
                    data.rowCount = rows;
                }.bind(this);

                interval = setInterval(updateRowHeight, 50);
                this.$nextTick(updateRowHeight);
            }
        });
    }

    AutoflowTabularView.prototype = Object.create(VueView.prototype);

    return AutoflowTabularView;
});

