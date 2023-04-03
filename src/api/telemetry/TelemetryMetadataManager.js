/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    'lodash'
], function (
    _
) {

    function applyReasonableDefaults(valueMetadata, index) {
        valueMetadata.source = valueMetadata.source || valueMetadata.key;
        valueMetadata.hints = valueMetadata.hints || {};

        if (Object.prototype.hasOwnProperty.call(valueMetadata.hints, 'x')) {
            if (!Object.prototype.hasOwnProperty.call(valueMetadata.hints, 'domain')) {
                valueMetadata.hints.domain = valueMetadata.hints.x;
            }

            delete valueMetadata.hints.x;
        }

        if (Object.prototype.hasOwnProperty.call(valueMetadata.hints, 'y')) {
            if (!Object.prototype.hasOwnProperty.call(valueMetadata.hints, 'range')) {
                valueMetadata.hints.range = valueMetadata.hints.y;
            }

            delete valueMetadata.hints.y;
        }

        if (valueMetadata.format === 'enum') {
            if (!valueMetadata.values) {
                valueMetadata.values = valueMetadata.enumerations.map(e => e.value);
            }

            if (!Object.prototype.hasOwnProperty.call(valueMetadata, 'max')) {
                valueMetadata.max = Math.max(valueMetadata.values) + 1;
            }

            if (!Object.prototype.hasOwnProperty.call(valueMetadata, 'min')) {
                valueMetadata.min = Math.min(valueMetadata.values) - 1;
            }
        }

        if (!Object.prototype.hasOwnProperty.call(valueMetadata.hints, 'priority')) {
            valueMetadata.hints.priority = index;
        }

        return valueMetadata;
    }

    /**
     * Utility class for handling and inspecting telemetry metadata.  Applies
     * reasonable defaults to simplify the task of providing metadata, while
     * also providing methods for interrogating telemetry metadata.
     */
    function TelemetryMetadataManager(metadata) {
        this.metadata = metadata;

        this.valueMetadatas = this.metadata.values ? this.metadata.values.map(applyReasonableDefaults) : [];
    }

    /**
     * Get value metadata for a single key.
     */
    TelemetryMetadataManager.prototype.value = function (key) {
        return this.valueMetadatas.filter(function (metadata) {
            return metadata.key === key;
        })[0];
    };

    /**
     * Returns all value metadatas, sorted by priority.
     */
    TelemetryMetadataManager.prototype.values = function () {
        return this.valuesForHints(['priority']);
    };

    /**
     * Get an array of valueMetadatas that posess all hints requested.
     * Array is sorted based on hint priority.
     *
     */
    TelemetryMetadataManager.prototype.valuesForHints = function (
        hints
    ) {
        function hasHint(hint) {
            // eslint-disable-next-line no-invalid-this
            return Object.prototype.hasOwnProperty.call(this.hints, hint);
        }

        function hasHints(metadata) {
            return hints.every(hasHint, metadata);
        }

        const matchingMetadata = this.valueMetadatas.filter(hasHints);
        let iteratees = hints.map(hint => {
            return (metadata) => {
                return metadata.hints[hint];
            };
        });

        return _.sortBy(matchingMetadata, ...iteratees);
    };

    /**
     * check out of a given metadata has array values
     */
    TelemetryMetadataManager.prototype.isArrayValue = function (metadata) {
        const regex = /\[\]$/g;
        if (!metadata.format && !metadata.formatString) {
            return false;
        }

        return (metadata.format || metadata.formatString).match(regex) !== null;
    };

    TelemetryMetadataManager.prototype.getFilterableValues = function () {
        return this.valueMetadatas.filter(metadatum => metadatum.filters && metadatum.filters.length > 0);
    };

    TelemetryMetadataManager.prototype.getDefaultDisplayValue = function () {
        let valueMetadata = this.valuesForHints(['range'])[0];

        if (valueMetadata === undefined) {
            valueMetadata = this.values().filter(values => {
                return !(values.hints.domain);
            })[0];
        }

        if (valueMetadata === undefined) {
            valueMetadata = this.values()[0];
        }

        return valueMetadata;
    };

    return TelemetryMetadataManager;

});
