/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import EventEmitter from 'EventEmitter';

export default class LADTableConfiguration extends EventEmitter {
    constructor(domainObject, openmct) {
        super();

        this.domainObject = domainObject;
        this.openmct = openmct;

        this.objectMutated = this.objectMutated.bind(this);
        this.unlistenFromMutation = openmct.objects.observe(domainObject, 'configuration', this.objectMutated);
    }

    getConfiguration() {
        const configuration = this.domainObject.configuration || {};
        configuration.hiddenColumns = configuration.hiddenColumns || {};
        configuration.isFixedLayout = configuration.isFixedLayout ?? true;

        return configuration;
    }

    updateConfiguration(configuration) {
        this.openmct.objects.mutate(this.domainObject, 'configuration', configuration);
    }

    objectMutated(configuration) {
        if (configuration !== undefined) {
            this.emit('change', configuration);
        }
    }

    destroy() {
        this.unlistenFromMutation();
    }
}
