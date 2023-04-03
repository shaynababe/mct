/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([

], function (

) {

    function SummaryWidgetMetadataProvider(openmct) {
        this.openmct = openmct;
    }

    SummaryWidgetMetadataProvider.prototype.supportsMetadata = function (domainObject) {
        return domainObject.type === 'summary-widget';
    };

    SummaryWidgetMetadataProvider.prototype.getDomains = function (domainObject) {
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
    };

    SummaryWidgetMetadataProvider.prototype.getMetadata = function (domainObject) {
        const ruleOrder = domainObject.configuration.ruleOrder || [];
        const enumerations = ruleOrder
            .filter(function (ruleId) {
                return Boolean(domainObject.configuration.ruleConfigById[ruleId]);
            })
            .map(function (ruleId, ruleIndex) {
                return {
                    string: domainObject.configuration.ruleConfigById[ruleId].label,
                    value: ruleIndex
                };
            });

        const metadata = {
            // Generally safe assumption is that we have one domain per timeSystem.
            values: this.getDomains().concat([
                {
                    name: 'State',
                    key: 'state',
                    source: 'ruleIndex',
                    format: 'enum',
                    enumerations: enumerations,
                    hints: {
                        range: 1
                    }
                },
                {
                    name: 'Rule Label',
                    key: 'ruleLabel',
                    format: 'string'
                },
                {
                    name: 'Rule Name',
                    key: 'ruleName',
                    format: 'string'
                },
                {
                    name: 'Message',
                    key: 'message',
                    format: 'string'
                },
                {
                    name: 'Background Color',
                    key: 'backgroundColor',
                    format: 'string'
                },
                {
                    name: 'Text Color',
                    key: 'textColor',
                    format: 'string'
                },
                {
                    name: 'Border Color',
                    key: 'borderColor',
                    format: 'string'
                },
                {
                    name: 'Display Icon',
                    key: 'icon',
                    format: 'string'
                }
            ])
        };

        return metadata;
    };

    return SummaryWidgetMetadataProvider;

});
