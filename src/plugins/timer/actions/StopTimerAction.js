/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


export default class StopTimerAction {
    constructor(openmct) {
        this.name = 'Stop';
        this.key = 'timer.stop';
        this.description = 'Stop the currently displayed timer';
        this.group = 'view';
        this.cssClass = 'icon-box-round-corners';
        this.priority = 1;

        this.openmct = openmct;
    }
    invoke(objectPath) {
        const domainObject = objectPath[0];
        if (!domainObject || !domainObject.configuration) {
            return new Error('Unable to run stop timer action. No domainObject provided.');
        }

        const newConfiguration = { ...domainObject.configuration };
        newConfiguration.timerState = 'stopped';
        newConfiguration.timestamp = undefined;
        newConfiguration.pausedTime = undefined;

        this.openmct.objects.mutate(domainObject, 'configuration', newConfiguration);
    }
    appliesTo(objectPath, view = {}) {
        const domainObject = objectPath[0];
        if (!domainObject || !domainObject.configuration) {
            return;
        }

        // Use object configuration timerState for viewless context menus,
        // otherwise manually show/hide based on the view's timerState
        const viewKey = view.key;
        const { timerState } = domainObject.configuration;

        return viewKey
            ? domainObject.type === 'timer'
            : domainObject.type === 'timer' && timerState !== 'stopped';
    }
}
