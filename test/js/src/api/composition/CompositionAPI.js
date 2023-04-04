/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import DefaultCompositionProvider from './DefaultCompositionProvider';
import CompositionCollection from './CompositionCollection';

/**
 * @typedef {import('./CompositionProvider').default} CompositionProvider
 */

/**
 * @typedef {import('../objects/ObjectAPI').DomainObject} DomainObject
 */

/**
 * @typedef {import('../../../openmct').OpenMCT} OpenMCT
 */

/**
 * An interface for interacting with the composition of domain objects.
 * The composition of a domain object is the list of other domain objects
 * it "contains" (for instance, that should be displayed beneath it
 * in the tree.)
 * @constructor
 */
export default class CompositionAPI {
    /**
     * @param {OpenMCT} publicAPI
     */
    constructor(publicAPI) {
        /** @type {CompositionProvider[]} */
        this.registry = [];
        /** @type {CompositionPolicy[]} */
        this.policies = [];
        this.addProvider(new DefaultCompositionProvider(publicAPI, this));
        /** @type {OpenMCT} */
        this.publicAPI = publicAPI;
    }
    /**
     * Add a composition provider.
     *
     * Plugins can add new composition providers to change the loading
     * behavior for certain domain objects.
     *
     * @method addProvider
     * @param {CompositionProvider} provider the provider to add
     */
    addProvider(provider) {
        this.registry.unshift(provider);
    }
    /**
     * Retrieve the composition (if any) of this domain object.
     *
     * @method get
     * @param {DomainObject} domainObject
     * @returns {CompositionCollection}
     */
    get(domainObject) {
        const provider = this.registry.find(p => {
            return p.appliesTo(domainObject);
        });

        if (!provider) {
            return;
        }

        return new CompositionCollection(domainObject, provider, this.publicAPI);
    }
    /**
     * A composition policy is a function which either allows or disallows
     * placing one object in another's composition.
     *
     * Open MCT's policy model requires consensus, so any one policy may
     * reject composition by returning false. As such, policies should
     * generally be written to return true in the default case.
     *
     * @callback CompositionPolicy
     * @param {DomainObject} containingObject the object which
     *        would act as a container
     * @param {DomainObject} containedObject the object which
     *        would be contained
     * @returns {boolean} false if this composition should be disallowed
     */
    /**
     * Add a composition policy. Composition policies may disallow domain
     * objects from containing other domain objects.
     *
     * @method addPolicy
     * @param {CompositionPolicy} policy
     *        the policy to add
     */
    addPolicy(policy) {
        this.policies.push(policy);
    }
    /**
     * Check whether or not a domain object is allowed to contain another
     * domain object.
     *
     * @private
     * @method checkPolicy
     * @param {DomainObject} container the object which
     *        would act as a container
     * @param {DomainObject} containee the object which
     *        would be contained
     * @returns {boolean} false if this composition should be disallowed
     * @param {CompositionPolicy} policy
     *        the policy to add
     */
    checkPolicy(container, containee) {
        return this.policies.every(function (policy) {
            return policy(container, containee);
        });
    }

    /**
     * Check whether or not a domainObject supports composition
     *
     * @param {DomainObject} domainObject
     * @returns {boolean} true if the domainObject supports composition
     */
    supportsComposition(domainObject) {
        return this.get(domainObject) !== undefined;
    }
}

