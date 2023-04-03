/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([], function () {
    class TelemetryTableRow {
        constructor(datum, columns, objectKeyString, limitEvaluator) {
            this.columns = columns;

            this.datum = createNormalizedDatum(datum, columns);
            this.fullDatum = datum;
            this.limitEvaluator = limitEvaluator;
            this.objectKeyString = objectKeyString;
        }

        getFormattedDatum(headers) {
            return Object.keys(headers).reduce((formattedDatum, columnKey) => {
                formattedDatum[columnKey] = this.getFormattedValue(columnKey);

                return formattedDatum;
            }, {});
        }

        getFormattedValue(key) {
            let column = this.columns[key];

            return column && column.getFormattedValue(this.datum[key]);
        }

        getParsedValue(key) {
            let column = this.columns[key];

            return column && column.getParsedValue(this.datum[key]);
        }

        getCellComponentName(key) {
            let column = this.columns[key];

            return column
                && column.getCellComponentName
                && column.getCellComponentName();
        }

        getRowClass() {
            if (!this.rowClass) {
                let limitEvaluation = this.limitEvaluator.evaluate(this.datum);
                this.rowClass = limitEvaluation && limitEvaluation.cssClass;
            }

            return this.rowClass;
        }

        getCellLimitClasses() {
            if (!this.cellLimitClasses) {
                this.cellLimitClasses = Object.values(this.columns).reduce((alarmStateMap, column) => {
                    if (!column.isUnit) {
                        let limitEvaluation = this.limitEvaluator.evaluate(this.datum, column.getMetadatum());
                        alarmStateMap[column.getKey()] = limitEvaluation && limitEvaluation.cssClass;
                    }

                    return alarmStateMap;
                }, {});
            }

            return this.cellLimitClasses;
        }

        getContextualDomainObject(openmct, objectKeyString) {
            return openmct.objects.get(objectKeyString);
        }

        getContextMenuActions() {
            return ['viewDatumAction', 'viewHistoricalData'];
        }
    }

    /**
     * Normalize the structure of datums to assist sorting and merging of columns.
     * Maps all sources to keys.
     * @private
     * @param {*} telemetryDatum
     * @param {*} metadataValues
     */
    function createNormalizedDatum(datum, columns) {
        const normalizedDatum = JSON.parse(JSON.stringify(datum));

        Object.values(columns).forEach(column => {
            normalizedDatum[column.getKey()] = column.getRawValue(datum);
        });

        return normalizedDatum;
    }

    return TelemetryTableRow;
});
