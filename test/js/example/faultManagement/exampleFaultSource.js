/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import utils from './utils';

export default function (staticFaults = false) {
    return function install(openmct) {
        openmct.install(openmct.plugins.FaultManagement());

        const faultsData = utils.randomFaults(staticFaults);

        openmct.faults.addProvider({
            request(domainObject, options) {
                return Promise.resolve(faultsData);
            },
            subscribe(domainObject, callback) {
                callback({ type: 'global-alarm-status' });

                return () => {};
            },
            supportsRequest(domainObject) {
                return domainObject.type === 'faultManagement';
            },
            supportsSubscribe(domainObject) {
                return domainObject.type === 'faultManagement';
            },
            acknowledgeFault(fault, { comment = '' }) {
                utils.acknowledgeFault(fault);

                return Promise.resolve({
                    success: true
                });
            },
            shelveFault(fault, duration) {
                utils.shelveFault(fault, duration);

                return Promise.resolve({
                    success: true
                });
            }
        });
    };
}
