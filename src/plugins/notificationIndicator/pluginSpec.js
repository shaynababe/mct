/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import NotificationIndicatorPlugin from './plugin.js';
import Vue from 'vue';
import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

describe('the plugin', () => {
    let notificationIndicatorPlugin;
    let openmct;
    let indicatorElement;
    let parentElement;
    let mockMessages = ['error', 'test', 'notifications'];

    beforeEach((done) => {
        openmct = createOpenMct();

        notificationIndicatorPlugin = new NotificationIndicatorPlugin();
        openmct.install(notificationIndicatorPlugin);

        parentElement = document.createElement('div');

        openmct.on('start', () => {
            mockMessages.forEach(message => {
                openmct.notifications.error(message);
            });
            done();
        });

        openmct.start();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe('the indicator plugin element', () => {
        beforeEach(() => {
            parentElement.append(indicatorElement);

            return Vue.nextTick();
        });

        it('notifies the user of the number of notifications', () => {
            let notificationCountElement = document.querySelector('.c-indicator__count');

            expect(notificationCountElement.innerText).toEqual(mockMessages.length.toString());
        });
    });
});
