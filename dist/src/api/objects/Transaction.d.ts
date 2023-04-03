export default class Transaction {
    constructor(objectAPI: any);
    dirtyObjects: {};
    objectAPI: any;
    add(object: any): void;
    cancel(): any;
    commit(): any;
    createDirtyObjectPromise(object: any, action: any): any;
    getDirtyObject(identifier: any): undefined;
    _clear(): any;
}
//# sourceMappingURL=Transaction.d.ts.map