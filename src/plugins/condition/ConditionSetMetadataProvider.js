/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class ConditionSetMetadataProvider {
    constructor(openmct) {
        this.openmct = openmct;
    }

    supportsMetadata(domainObject) {
        return domainObject.type === 'conditionSet';
    }

    getDomains(domainObject) {
        return this.openmct.time.getAllTimeSystems().map(function (ts, i) {
            return {
                key: ts.key,
                name: ts.name,
                format: ts.timeFormat,
                hints: {
                    domain: i
                }
            };
        });
    }

    getMetadata(domainObject) {
        const enumerations = domainObject.configuration.conditionCollection
            .map((condition, index) => {
                return {
                    string: condition.configuration.output,
                    value: index
                };
            });

        return {
            values: this.getDomains().concat([
                {
                    key: "state",
                    source: "output",
                    name: "State",
                    format: "enum",
                    enumerations: enumerations,
                    hints: {
                        range: 1
                    }
                },
                {
                    key: "output",
                    name: "Value",
                    format: "string",
                    hints: {
                        range: 2
                    }
                }
            ])
        };
    }
}
