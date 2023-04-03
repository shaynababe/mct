export default instance;
declare function instance(rootRegistry: any): RootObjectProvider;
declare class RootObjectProvider {
    constructor(rootRegistry: any);
    rootRegistry: any;
    rootObject: {
        identifier: {
            key: string;
            namespace: string;
        };
        name: string;
        type: string;
        composition: never[];
    } | undefined;
    updateName(name: any): void;
    get(): Promise<{
        identifier: {
            key: string;
            namespace: string;
        };
        name: string;
        type: string;
        composition: never[];
    } | undefined>;
}
//# sourceMappingURL=RootObjectProvider.d.ts.map