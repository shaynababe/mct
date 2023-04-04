/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    'lodash',
    'EventEmitter'
], function (_, EventEmitter) {

    class TelemetryTableConfiguration extends EventEmitter {
        constructor(domainObject, openmct) {
            super();

            this.domainObject = domainObject;
            this.openmct = openmct;
            this.columns = {};

            this.removeColumnsForObject = this.removeColumnsForObject.bind(this);
            this.objectMutated = this.objectMutated.bind(this);

            this.unlistenFromMutation = openmct.objects.observe(domainObject, 'configuration', this.objectMutated);
        }

        getConfiguration() {
            let configuration = this.domainObject.configuration || {};
            configuration.hiddenColumns = configuration.hiddenColumns || {};
            configuration.columnWidths = configuration.columnWidths || {};
            configuration.columnOrder = configuration.columnOrder || [];
            configuration.cellFormat = configuration.cellFormat || {};
            configuration.autosize = configuration.autosize === undefined ? true : configuration.autosize;

            return configuration;
        }

        updateConfiguration(configuration) {
            this.openmct.objects.mutate(this.domainObject, 'configuration', configuration);
        }

        /**
         * @private
         * @param {*} object
         */
        objectMutated(configuration) {
            if (configuration !== undefined) {
                this.emit('change', configuration);
            }
        }

        addSingleColumnForObject(telemetryObject, column, position) {
            let objectKeyString = this.openmct.objects.makeKeyString(telemetryObject.identifier);
            this.columns[objectKeyString] = this.columns[objectKeyString] || [];
            position = position || this.columns[objectKeyString].length;
            this.columns[objectKeyString].splice(position, 0, column);
        }

        removeColumnsForObject(objectIdentifier) {
            let objectKeyString = this.openmct.objects.makeKeyString(objectIdentifier);
            let columnsToRemove = this.columns[objectKeyString];

            delete this.columns[objectKeyString];

            let configuration = this.domainObject.configuration;
            let configurationChanged = false;
            columnsToRemove.forEach((column) => {
                //There may be more than one column with the same key (eg. time system columns)
                if (!this.hasColumnWithKey(column.getKey())) {
                    delete configuration.hiddenColumns[column.getKey()];
                    configurationChanged = true;
                }
            });
            if (configurationChanged) {
                this.updateConfiguration(configuration);
            }
        }

        hasColumnWithKey(columnKey) {
            return _.flatten(Object.values(this.columns))
                .some(column => column.getKey() === columnKey);
        }

        getColumns() {
            return this.columns;
        }

        getAllHeaders() {
            let flattenedColumns = _.flatten(Object.values(this.columns));
            /* eslint-disable you-dont-need-lodash-underscore/uniq */
            let headers = _.uniq(flattenedColumns, false, column => column.getKey())
                .reduce(fromColumnsToHeadersMap, {});
            /* eslint-enable you-dont-need-lodash-underscore/uniq */
            function fromColumnsToHeadersMap(headersMap, column) {
                headersMap[column.getKey()] = column.getTitle();

                return headersMap;
            }

            return headers;
        }

        getVisibleHeaders() {
            let allHeaders = this.getAllHeaders();
            let configuration = this.getConfiguration();

            let orderedColumns = this.getColumnOrder();
            let unorderedColumns = _.difference(Object.keys(allHeaders), orderedColumns);

            return orderedColumns.concat(unorderedColumns)
                .filter((headerKey) => {
                    return configuration.hiddenColumns[headerKey] !== true;
                })
                .reduce((headers, headerKey) => {
                    headers[headerKey] = allHeaders[headerKey];

                    return headers;
                }, {});
        }

        getColumnWidths() {
            let configuration = this.getConfiguration();

            return configuration.columnWidths;
        }

        setColumnWidths(columnWidths) {
            let configuration = this.getConfiguration();
            configuration.columnWidths = columnWidths;
            this.updateConfiguration(configuration);
        }

        getColumnOrder() {
            let configuration = this.getConfiguration();

            return configuration.columnOrder;
        }

        setColumnOrder(columnOrder) {
            let configuration = this.getConfiguration();
            configuration.columnOrder = columnOrder;
            this.updateConfiguration(configuration);
        }

        destroy() {
            this.unlistenFromMutation();
        }
    }

    return TelemetryTableConfiguration;
});
