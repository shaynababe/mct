/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import moment from 'moment';

export default class StartTimerAction {
    constructor(openmct) {
        this.name = 'Start';
        this.key = 'timer.start';
        this.description = 'Start the currently displayed timer';
        this.group = 'view';
        this.cssClass = 'icon-play';
        this.priority = 3;

        this.openmct = openmct;
    }
    invoke(objectPath) {
        const domainObject = objectPath[0];
        if (!domainObject || !domainObject.configuration) {
            return new Error('Unable to run start timer action. No domainObject provided.');
        }

        let { pausedTime, timestamp } = domainObject.configuration;
        const newConfiguration = { ...domainObject.configuration };

        if (pausedTime) {
            pausedTime = moment(pausedTime);
        }

        if (timestamp) {
            timestamp = moment(timestamp);
        }

        const now = moment(new Date());
        if (pausedTime) {
            const timeShift = moment.duration(now.diff(pausedTime));
            const shiftedTime = timestamp.add(timeShift);
            newConfiguration.timestamp = shiftedTime.toDate();
        } else if (!timestamp) {
            newConfiguration.timestamp = now.toDate();
        }

        newConfiguration.timerState = 'started';
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
            : domainObject.type === 'timer' && timerState !== 'started';
    }
}
