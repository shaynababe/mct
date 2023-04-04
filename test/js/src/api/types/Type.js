/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


/**
 * A Type describes a kind of domain object that may appear or be
 * created within Open MCT.
 *
 * @param {module:opemct.TypeRegistry~TypeDefinition} definition
 * @class Type
 * @memberof module:openmct
 */
export default class Type {
    constructor(definition) {
        this.definition = definition;
        if (definition.key) {
            this.key = definition.key;
        }
    }
    /**
     * Create a type definition from a legacy definition.
     */
    static definitionFromLegacyDefinition(legacyDefinition) {
        let definition = {};
        definition.name = legacyDefinition.name;
        definition.cssClass = legacyDefinition.cssClass;
        definition.description = legacyDefinition.description;
        definition.form = legacyDefinition.properties;
        if (legacyDefinition.telemetry !== undefined) {
            let telemetry = {
                values: []
            };

            if (legacyDefinition.telemetry.domains !== undefined) {
                legacyDefinition.telemetry.domains.forEach((domain, index) => {
                    domain.hints = {
                        domain: index
                    };
                    telemetry.values.push(domain);
                });
            }

            if (legacyDefinition.telemetry.ranges !== undefined) {
                legacyDefinition.telemetry.ranges.forEach((range, index) => {
                    range.hints = {
                        range: index
                    };
                    telemetry.values.push(range);
                });
            }

            definition.telemetry = telemetry;
        }

        if (legacyDefinition.model) {
            definition.initialize = function (model) {
                for (let [k, v] of Object.entries(legacyDefinition.model)) {
                    model[k] = JSON.parse(JSON.stringify(v));
                }
            };
        }

        if (legacyDefinition.features && legacyDefinition.features.includes("creation")) {
            definition.creatable = true;
        }

        return definition;
    }
    /**
     * Check if a domain object is an instance of this type.
     * @param domainObject
     * @returns {boolean} true if the domain object is of this type
     * @memberof module:openmct.Type#
     * @method check
     */
    check(domainObject) {
        // Depends on assignment from MCT.
        return domainObject.type === this.key;
    }
    /**
     * Get a definition for this type that can be registered using the
     * legacy bundle format.
     * @private
     */
    toLegacyDefinition() {
        const def = {};
        def.name = this.definition.name;
        def.cssClass = this.definition.cssClass;
        def.description = this.definition.description;
        def.properties = this.definition.form;

        if (this.definition.initialize) {
            def.model = {};
            this.definition.initialize(def.model);
        }

        if (this.definition.creatable) {
            def.features = ['creation'];
        }

        return def;
    }
}
