/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class FaultManagementAPI {
    /**
     * @param {import("openmct").OpenMCT} openmct
     */
    constructor(openmct) {
        this.openmct = openmct;
    }

    /**
     * @param {*} provider
     */
    addProvider(provider) {
        this.provider = provider;
    }

    /**
     * @returns {boolean}
     */
    supportsActions() {
        return this.provider?.acknowledgeFault !== undefined && this.provider?.shelveFault !== undefined;
    }

    /**
     * @param {import("../objects/ObjectAPI").DomainObject} domainObject
     * @returns {Promise.<FaultAPIResponse[]>}
     */
    request(domainObject) {
        if (!this.provider?.supportsRequest(domainObject)) {
            return Promise.reject();
        }

        return this.provider.request(domainObject);
    }

    /**
     * @param {import("../objects/ObjectAPI").DomainObject} domainObject
     * @param {Function} callback
     * @returns {Function} unsubscribe
     */
    subscribe(domainObject, callback) {
        if (!this.provider?.supportsSubscribe(domainObject)) {
            return Promise.reject();
        }

        return this.provider.subscribe(domainObject, callback);
    }

    /**
     * @param {Fault} fault
     * @param {*} ackData
     */
    acknowledgeFault(fault, ackData) {
        return this.provider.acknowledgeFault(fault, ackData);
    }

    /**
     * @param {Fault} fault
     * @param {*} shelveData
     * @returns {Promise.<T>}
     */
    shelveFault(fault, shelveData) {
        return this.provider.shelveFault(fault, shelveData);
    }
}

/**
 * @typedef {object} TriggerValueInfo
 * @property {number} value
 * @property {string} rangeCondition
 * @property {string} monitoringResult
 */

/**
 * @typedef {object} CurrentValueInfo
 * @property {number} value
 * @property {string} rangeCondition
 * @property {string} monitoringResult
 */

/**
 * @typedef {object} Fault
 * @property {boolean} acknowledged
 * @property {CurrentValueInfo} currentValueInfo
 * @property {string} id
 * @property {string} name
 * @property {string} namespace
 * @property {number} seqNum
 * @property {string} severity
 * @property {boolean} shelved
 * @property {string} shortDescription
 * @property {string} triggerTime
 * @property {TriggerValueInfo} triggerValueInfo
 */

/**
 * @typedef {object} FaultAPIResponse
 * @property {string} type
 * @property {Fault} fault
 */
