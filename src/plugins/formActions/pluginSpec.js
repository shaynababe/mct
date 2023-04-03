/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import {
    createMouseEvent,
    createOpenMct,
    resetApplicationState
} from 'utils/testing';
import Vue from 'vue';

import { debounce } from 'lodash';

describe('EditPropertiesAction plugin', () => {
    let editPropertiesAction;
    let openmct;
    let element;

    beforeEach((done) => {
        element = document.createElement('div');
        element.style.display = 'block';
        element.style.width = '1920px';
        element.style.height = '1080px';

        openmct = createOpenMct();
        openmct.on('start', done);
        openmct.startHeadless(element);

        editPropertiesAction = openmct.actions.getAction('properties');
    });

    afterEach(() => {
        editPropertiesAction = null;

        return resetApplicationState(openmct);
    });

    it('editPropertiesAction exists', () => {
        expect(editPropertiesAction.key).toEqual('properties');
    });

    it('edit properties action applies to only persistable objects', () => {
        spyOn(openmct.objects, 'isPersistable').and.returnValue(true);

        const domainObject = {
            name: 'mock folder',
            type: 'folder',
            identifier: {
                key: 'mock-folder',
                namespace: ''
            },
            composition: []
        };
        const isApplicableTo = editPropertiesAction.appliesTo([domainObject]);
        expect(isApplicableTo).toBe(true);
    });

    it('edit properties action does not apply to non persistable objects', () => {
        spyOn(openmct.objects, 'isPersistable').and.returnValue(false);

        const domainObject = {
            name: 'mock folder',
            type: 'folder',
            identifier: {
                key: 'mock-folder',
                namespace: ''
            },
            composition: []
        };
        const isApplicableTo = editPropertiesAction.appliesTo([domainObject]);
        expect(isApplicableTo).toBe(false);
    });

    it('edit properties action when invoked shows form', (done) => {
        const domainObject = {
            name: 'mock folder',
            notes: 'mock notes',
            type: 'folder',
            identifier: {
                key: 'mock-folder',
                namespace: ''
            },
            modified: 1643065068597,
            persisted: 1643065068600,
            composition: []
        };

        editPropertiesAction.invoke([domainObject])
            .then(() => {
                done();
            })
            .catch(() => {
                done();
            });

        Vue.nextTick(() => {
            const form = document.querySelector('.js-form');
            const title = form.querySelector('input');
            expect(title.value).toEqual(domainObject.name);

            const notes = form.querySelector('textArea');
            expect(notes.value).toEqual(domainObject.notes);

            const buttons = form.querySelectorAll('button');
            expect(buttons[0].textContent.trim()).toEqual('OK');
            expect(buttons[1].textContent.trim()).toEqual('Cancel');

            const clickEvent = createMouseEvent('click');
            buttons[1].dispatchEvent(clickEvent);
        });
    });

    it('edit properties action saves changes', (done) => {
        const oldName = 'mock folder';
        const newName = 'renamed mock folder';
        const domainObject = {
            name: oldName,
            notes: 'mock notes',
            type: 'folder',
            identifier: {
                key: 'mock-folder',
                namespace: ''
            },
            modified: 1643065068597,
            persisted: 1643065068600,
            composition: []
        };
        let unObserve;

        function callback(newObject) {
            expect(newObject.name).not.toEqual(oldName);
            expect(newObject.name).toEqual(newName);

            unObserve();
            done();
        }

        const deBouncedCallback = debounce(callback, 300);
        unObserve = openmct.objects.observe(domainObject, '*', deBouncedCallback);

        editPropertiesAction.invoke([domainObject]);

        Vue.nextTick(() => {
            const form = document.querySelector('.js-form');
            const title = form.querySelector('input');
            const notes = form.querySelector('textArea');

            const buttons = form.querySelectorAll('button');
            expect(buttons[0].textContent.trim()).toEqual('OK');
            expect(buttons[1].textContent.trim()).toEqual('Cancel');

            expect(title.value).toEqual(domainObject.name);
            expect(notes.value).toEqual(domainObject.notes);

            // change input field value and dispatch event for it
            title.focus();
            title.value = newName;
            title.dispatchEvent(new Event('input'));
            title.blur();

            const clickEvent = createMouseEvent('click');
            buttons[0].dispatchEvent(clickEvent);
        });
    });

    it('edit properties action discards changes', (done) => {
        const name = 'mock folder';
        const domainObject = {
            name,
            notes: 'mock notes',
            type: 'folder',
            identifier: {
                key: 'mock-folder',
                namespace: ''
            },
            modified: 1643065068597,
            persisted: 1643065068600,
            composition: []
        };

        editPropertiesAction.invoke([domainObject])
            .then(() => {
                expect(domainObject.name).toEqual(name);
                done();
            })
            .catch(() => {
                expect(domainObject.name).toEqual(name);
                done();
            });

        const form = document.querySelector('.js-form');
        const buttons = form.querySelectorAll('button');
        const clickEvent = createMouseEvent('click');
        buttons[1].dispatchEvent(clickEvent);
    });
});
