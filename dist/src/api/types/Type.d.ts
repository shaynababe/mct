/**
 * A Type describes a kind of domain object that may appear or be
 * created within Open MCT.
 *
 * @param {module:opemct.TypeRegistry~TypeDefinition} definition
 * @class Type
 * @memberof module:openmct
 */
export default class Type {
    /**
     * Create a type definition from a legacy definition.
     */
    static definitionFromLegacyDefinition(legacyDefinition: any): {
        name: any;
        cssClass: any;
        description: any;
        form: any;
        telemetry: {
            values: never[];
        };
        initialize(model: any): void;
        creatable: boolean;
    };
    constructor(definition: any);
    definition: any;
    key: any;
    /**
     * Check if a domain object is an instance of this type.
     * @param domainObject
     * @returns {boolean} true if the domain object is of this type
     * @memberof module:openmct.Type#
     * @method check
     */
    check(domainObject: any): boolean;
    /**
     * Get a definition for this type that can be registered using the
     * legacy bundle format.
     * @private
     */
    private toLegacyDefinition;
}
//# sourceMappingURL=Type.d.ts.map