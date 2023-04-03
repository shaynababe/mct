export default class FaultManagementAPI {
    /**
     * @param {import("openmct").OpenMCT} openmct
     */
    constructor(openmct: import("openmct").OpenMCT);
    openmct: import("openmct").OpenMCT;
    /**
     * @param {*} provider
     */
    addProvider(provider: any): void;
    provider: any;
    /**
     * @returns {boolean}
     */
    supportsActions(): boolean;
    /**
     * @param {import("../objects/ObjectAPI").DomainObject} domainObject
     * @returns {Promise.<FaultAPIResponse[]>}
     */
    request(domainObject: import("../objects/ObjectAPI").DomainObject): Promise<FaultAPIResponse[]>;
    /**
     * @param {import("../objects/ObjectAPI").DomainObject} domainObject
     * @param {Function} callback
     * @returns {Function} unsubscribe
     */
    subscribe(domainObject: import("../objects/ObjectAPI").DomainObject, callback: Function): Function;
    /**
     * @param {Fault} fault
     * @param {*} ackData
     */
    acknowledgeFault(fault: Fault, ackData: any): any;
    /**
     * @param {Fault} fault
     * @param {*} shelveData
     * @returns {Promise.<T>}
     */
    shelveFault(fault: Fault, shelveData: any): Promise<T>;
}
export type TriggerValueInfo = {
    value: number;
    rangeCondition: string;
    monitoringResult: string;
};
export type CurrentValueInfo = {
    value: number;
    rangeCondition: string;
    monitoringResult: string;
};
export type Fault = {
    acknowledged: boolean;
    currentValueInfo: CurrentValueInfo;
    id: string;
    name: string;
    namespace: string;
    seqNum: number;
    severity: string;
    shelved: boolean;
    shortDescription: string;
    triggerTime: string;
    triggerValueInfo: TriggerValueInfo;
};
export type FaultAPIResponse = {
    type: string;
    fault: Fault;
};
//# sourceMappingURL=FaultManagementAPI.d.ts.map