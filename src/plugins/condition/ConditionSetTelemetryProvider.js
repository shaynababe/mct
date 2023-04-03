/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import ConditionManager from './ConditionManager';

export default class ConditionSetTelemetryProvider {
    constructor(openmct) {
        this.openmct = openmct;
        this.conditionManagerPool = {};
    }

    isTelemetryObject(domainObject) {
        return domainObject.type === 'conditionSet';
    }

    supportsRequest(domainObject) {
        return domainObject.type === 'conditionSet';
    }

    supportsSubscribe(domainObject) {
        return domainObject.type === 'conditionSet';
    }

    request(domainObject, options) {
        let conditionManager = this.getConditionManager(domainObject);

        return conditionManager.requestLADConditionSetOutput(options)
            .then(latestOutput => {
                return latestOutput;
            });
    }

    subscribe(domainObject, callback) {
        let conditionManager = this.getConditionManager(domainObject);

        conditionManager.on('conditionSetResultUpdated', (data) => {
            callback(data);
        });

        return this.destroyConditionManager.bind(this, this.openmct.objects.makeKeyString(domainObject.identifier));
    }

    /**
     * returns conditionManager instance for corresponding domain object
     * creates the instance if it is not yet created
     * @private
     */
    getConditionManager(domainObject) {
        const id = this.openmct.objects.makeKeyString(domainObject.identifier);

        if (!this.conditionManagerPool[id]) {
            this.conditionManagerPool[id] = new ConditionManager(domainObject, this.openmct);
        }

        return this.conditionManagerPool[id];
    }

    /**
     * cleans up and destroys conditionManager instance for corresponding domain object id
     * can be called manually for views that only request but do not subscribe to data
     */
    destroyConditionManager(id) {
        if (this.conditionManagerPool[id]) {
            this.conditionManagerPool[id].off('conditionSetResultUpdated');
            this.conditionManagerPool[id].destroy();
            delete this.conditionManagerPool[id];
        }
    }
}
