/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import StalenessUtils from '@/utils/staleness';

export default {
    data() {
        return {
            isStale: false
        };
    },
    beforeDestroy() {
        this.triggerUnsubscribeFromStaleness();
    },
    methods: {
        subscribeToStaleness(domainObject, callback) {
            if (!this.stalenessUtils) {
                this.stalenessUtils = new StalenessUtils(this.openmct, domainObject);
            }

            this.requestStaleness(domainObject);
            this.unsubscribeFromStaleness = this.openmct.telemetry.subscribeToStaleness(domainObject, (stalenessResponse) => {
                this.handleStalenessResponse(stalenessResponse, callback);
            });
        },
        async requestStaleness(domainObject) {
            const stalenessResponse = await this.openmct.telemetry.isStale(domainObject);
            if (stalenessResponse !== undefined) {
                this.handleStalenessResponse(stalenessResponse);
            }
        },
        handleStalenessResponse(stalenessResponse, callback) {
            if (this.stalenessUtils.shouldUpdateStaleness(stalenessResponse)) {
                if (typeof callback === 'function') {
                    callback(stalenessResponse.isStale);
                } else {
                    this.isStale = stalenessResponse.isStale;
                }
            }
        },
        triggerUnsubscribeFromStaleness() {
            if (this.unsubscribeFromStaleness) {
                this.unsubscribeFromStaleness();
                delete this.unsubscribeFromStaleness;
                this.stalenessUtils.destroy();
            }
        }
    }
};
