/* eslint-disable no-invalid-this */
/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

describe("The local storage plugin", () => {
    let space;
    let openmct;

    beforeEach(() => {
        space = `test-${Date.now()}`;
        openmct = createOpenMct();

        openmct.install(openmct.plugins.LocalStorage('', space));

    });

    it('initializes localstorage if not already initialized', () => {
        const ls = getLocalStorage();
        expect(ls[space]).toBeDefined();
    });

    it('successfully persists an object to localstorage', async () => {
        const domainObject = {
            identifier: {
                namespace: '',
                key: 'test-key'
            },
            name: 'A test object'
        };
        let spaceAsObject = getSpaceAsObject();
        expect(spaceAsObject['test-key']).not.toBeDefined();

        await openmct.objects.save(domainObject);

        spaceAsObject = getSpaceAsObject();
        expect(spaceAsObject['test-key']).toBeDefined();
    });

    it('successfully retrieves an object from localstorage', async () => {
        const domainObject = {
            identifier: {
                namespace: '',
                key: 'test-key'
            },
            name: 'A test object',
            anotherProperty: Date.now()
        };
        await openmct.objects.save(domainObject);

        let testObject = await openmct.objects.get(domainObject.identifier);

        expect(testObject.name).toEqual(domainObject.name);
        expect(testObject.anotherProperty).toEqual(domainObject.anotherProperty);
    });

    afterEach(() => {
        resetApplicationState(openmct);
        resetLocalStorage();
    });

    function resetLocalStorage() {
        delete window.localStorage[space];
    }

    function getLocalStorage() {
        return window.localStorage;
    }

    function getSpaceAsObject() {
        return JSON.parse(getLocalStorage()[space]);
    }
});
