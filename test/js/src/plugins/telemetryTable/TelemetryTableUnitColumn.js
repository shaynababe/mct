/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

define([
    './TelemetryTableColumn.js'
], function (
    TelemetryTableColumn
) {
    class TelemetryTableUnitColumn extends TelemetryTableColumn {
        constructor(openmct, metadatum) {
            super(openmct, metadatum);
            this.isUnit = true;
            this.titleValue += ' Unit';
            this.formatter = {
                format: (datum) => {
                    return this.metadatum.unit;
                },
                parse: (datum) => {
                    return this.metadatum.unit;
                }
            };
        }

        getKey() {
            return this.metadatum.key + '-unit';
        }

        getTitle() {
            return this.metadatum.name + ' Unit';
        }

        getRawValue(telemetryDatum) {
            return this.metadatum.unit;
        }

        getFormattedValue(telemetryDatum) {
            return this.formatter.format(telemetryDatum);
        }
    }

    return TelemetryTableUnitColumn;
});
