/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
define(function () {
    class TelemetryTableColumn {
        constructor(openmct, metadatum, options = {selectable: false}) {
            this.metadatum = metadatum;
            this.formatter = openmct.telemetry.getValueFormatter(metadatum);
            this.titleValue = this.metadatum.name;
            this.selectable = options.selectable;
        }

        getKey() {
            return this.metadatum.key;
        }

        getTitle() {
            return this.metadatum.name;
        }

        getMetadatum() {
            return this.metadatum;
        }

        hasValueForDatum(telemetryDatum) {
            return Object.prototype.hasOwnProperty.call(telemetryDatum, this.metadatum.source);
        }

        getRawValue(telemetryDatum) {
            return telemetryDatum[this.metadatum.source];
        }

        getFormattedValue(telemetryDatum) {
            let formattedValue = this.formatter.format(telemetryDatum);
            if (formattedValue !== undefined && typeof formattedValue !== 'string') {
                return formattedValue.toString();
            } else {
                return formattedValue;
            }
        }

        getParsedValue(telemetryDatum) {
            return this.formatter.parse(telemetryDatum);
        }
    }

    return TelemetryTableColumn;
});
