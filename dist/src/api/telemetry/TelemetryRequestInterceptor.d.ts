export default class TelemetryRequestInterceptorRegistry {
    interceptors: any[];
    /**
     * @interface TelemetryRequestInterceptorDef
     * @property {function} appliesTo function that determines if this interceptor should be called for the given identifier/request
     * @property {function} invoke function that transforms the provided request and returns the transformed request
     * @property {function} priority the priority for this interceptor. A higher number returned has more weight than a lower number
     * @memberof module:openmct TelemetryRequestInterceptorRegistry#
     */
    /**
     * Register a new telemetry request interceptor.
     *
     * @param {module:openmct.RequestInterceptorDef} requestInterceptorDef the interceptor to add
     * @method addInterceptor
     * @memberof module:openmct.TelemetryRequestInterceptorRegistry#
     */
    addInterceptor(interceptorDef: any): void;
    /**
     * Retrieve all interceptors applicable to a domain object/request.
     * @method getInterceptors
     * @returns [module:openmct.RequestInterceptorDef] the registered interceptors for this identifier/request
     * @memberof module:openmct.TelemetryRequestInterceptorRegistry#
     */
    getInterceptors(identifier: any, request: any): any[];
}
//# sourceMappingURL=TelemetryRequestInterceptor.d.ts.map