/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import EventEmitter from 'EventEmitter';

export const DEFAULT_CONFIGURATION = {
    clipActivityNames: false,
    swimlaneVisibility: {}
};

export default class PlanViewConfiguration extends EventEmitter {
    constructor(domainObject, openmct) {
        super();

        this.domainObject = domainObject;
        this.openmct = openmct;

        this.configurationChanged = this.configurationChanged.bind(this);
        this.unlistenFromMutation = openmct.objects.observe(domainObject, 'configuration', this.configurationChanged);
    }

    /**
     * @returns {Object.<string, any>}
     */
    getConfiguration() {
        const configuration = this.domainObject.configuration ?? {};
        for (const configKey of Object.keys(DEFAULT_CONFIGURATION)) {
            configuration[configKey] = configuration[configKey] ?? DEFAULT_CONFIGURATION[configKey];
        }

        return configuration;
    }

    #updateConfiguration(configuration) {
        this.openmct.objects.mutate(this.domainObject, 'configuration', configuration);
    }

    /**
     * @param {string} swimlaneName
     * @param {boolean} isVisible
     */
    setSwimlaneVisibility(swimlaneName, isVisible) {
        const configuration = this.getConfiguration();
        const { swimlaneVisibility } = configuration;
        swimlaneVisibility[swimlaneName] = isVisible;
        this.#updateConfiguration(configuration);
    }

    resetSwimlaneVisibility() {
        const configuration = this.getConfiguration();
        const swimlaneVisibility = {};
        configuration.swimlaneVisibility = swimlaneVisibility;
        this.#updateConfiguration(configuration);
    }

    initializeSwimlaneVisibility(swimlaneNames) {
        const configuration = this.getConfiguration();
        const { swimlaneVisibility } = configuration;
        let shouldMutate = false;
        for (const swimlaneName of swimlaneNames) {
            if (swimlaneVisibility[swimlaneName] === undefined) {
                swimlaneVisibility[swimlaneName] = true;
                shouldMutate = true;
            }
        }

        if (shouldMutate) {
            configuration.swimlaneVisibility = swimlaneVisibility;
            this.#updateConfiguration(configuration);
        }
    }

    /**
     * @param {boolean} isEnabled
     */
    setClipActivityNames(isEnabled) {
        const configuration = this.getConfiguration();
        configuration.clipActivityNames = isEnabled;
        this.#updateConfiguration(configuration);
    }

    configurationChanged(configuration) {
        if (configuration !== undefined) {
            this.emit('change', configuration);
        }
    }

    destroy() {
        this.unlistenFromMutation();
    }
}
