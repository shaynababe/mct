/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    'lodash',
    'printj'
], function (
    _,
    printj
) {

    // TODO: needs reference to formatService;
    function TelemetryValueFormatter(valueMetadata, formatMap) {
        const numberFormatter = {
            parse: function (x) {
                return Number(x);
            },
            format: function (x) {
                return x;
            },
            validate: function (x) {
                return true;
            }
        };

        this.valueMetadata = valueMetadata;

        function getNonArrayValue(value) {
            //metadata format could have array formats ex. string[]/number[]
            const arrayRegex = /\[\]$/g;
            if (value && value.match(arrayRegex)) {
                return value.replace(arrayRegex, '');
            }

            return value;
        }

        let valueMetadataFormat = getNonArrayValue(valueMetadata.format);

        //Is there an existing formatter for the format specified? If not, default to number format
        this.formatter = formatMap.get(valueMetadataFormat) || numberFormatter;

        if (valueMetadataFormat === 'enum') {
            this.formatter = {};
            this.enumerations = valueMetadata.enumerations.reduce(function (vm, e) {
                vm.byValue[e.value] = e.string;
                vm.byString[e.string] = e.value;

                return vm;
            }, {
                byValue: {},
                byString: {}
            });
            this.formatter.format = function (value) {
                if (Object.prototype.hasOwnProperty.call(this.enumerations.byValue, value)) {
                    return this.enumerations.byValue[value];
                }

                return value;
            }.bind(this);
            this.formatter.parse = function (string) {
                if (typeof string === "string") {
                    if (Object.prototype.hasOwnProperty.call(this.enumerations.byString, string)) {
                        return this.enumerations.byString[string];
                    }
                }

                return Number(string);
            }.bind(this);
        }

        // Check for formatString support once instead of per format call.
        if (valueMetadata.formatString) {
            const baseFormat = this.formatter.format;
            const formatString = getNonArrayValue(valueMetadata.formatString);
            this.formatter.format = function (value) {
                return printj.sprintf(formatString, baseFormat.call(this, value));
            };
        }

        if (valueMetadataFormat === 'string') {
            this.formatter.parse = function (value) {
                if (value === undefined) {
                    return '';
                }

                if (typeof value === 'string') {
                    return value;
                } else {
                    return value.toString();
                }
            };

            this.formatter.format = function (value) {
                return value;
            };

            this.formatter.validate = function (value) {
                return typeof value === 'string';
            };
        }
    }

    TelemetryValueFormatter.prototype.parse = function (datum) {
        const isDatumArray = Array.isArray(datum);
        if (_.isObject(datum)) {
            const objectDatum = isDatumArray ? datum : datum[this.valueMetadata.source];
            if (Array.isArray(objectDatum)) {
                return objectDatum.map((item) => {
                    return this.formatter.parse(item);
                });
            } else {
                return this.formatter.parse(objectDatum);
            }
        }

        return this.formatter.parse(datum);
    };

    TelemetryValueFormatter.prototype.format = function (datum) {
        const isDatumArray = Array.isArray(datum);
        if (_.isObject(datum)) {
            const objectDatum = isDatumArray ? datum : datum[this.valueMetadata.source];
            if (Array.isArray(objectDatum)) {
                return objectDatum.map((item) => {
                    return this.formatter.format(item);
                });
            } else {
                return this.formatter.format(objectDatum);
            }
        }

        return this.formatter.format(datum);
    };

    return TelemetryValueFormatter;
});
