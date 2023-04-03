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
import {
    createMyItemsIdentifier,
    MY_ITEMS_KEY
} from './createMyItemsIdentifier';

const MISSING_NAME = `Missing: ${MY_ITEMS_KEY}`;
const DEFAULT_NAME = 'My Items';
const FANCY_NAME = 'Fancy Items';
const myItemsIdentifier = createMyItemsIdentifier();

describe("the plugin", () => {
    let openmct;
    let missingObj = {
        identifier: myItemsIdentifier,
        type: 'unknown',
        name: MISSING_NAME
    };

    describe('with no arguments passed in', () => {

        beforeEach((done) => {
            openmct = createOpenMct();
            openmct.install(openmct.plugins.MyItems());

            openmct.on('start', done);
            openmct.startHeadless();
        });

        afterEach(() => {
            return resetApplicationState(openmct);
        });

        it('when installed, adds "My Items" to the root', async () => {
            const root = await openmct.objects.get('ROOT');
            const rootCompostionCollection = openmct.composition.get(root);
            const rootCompostion = await rootCompostionCollection.load();
            let myItems = rootCompostion.filter((domainObject) => {
                return openmct.objects.areIdsEqual(domainObject.identifier, myItemsIdentifier);
            })[0];

            expect(myItems.name).toBe(DEFAULT_NAME);
            expect(myItems).toBeDefined();
        });

        describe('adds an interceptor that returns a "My Items" model for', () => {
            let myItemsObject;
            let mockNotFoundProvider;
            let activeProvider;

            beforeEach(async () => {
                mockNotFoundProvider = {
                    get: () => Promise.reject(new Error('Not found')),
                    create: () => Promise.resolve(missingObj),
                    update: () => Promise.resolve(missingObj)
                };

                activeProvider = mockNotFoundProvider;
                spyOn(openmct.objects, 'getProvider').and.returnValue(activeProvider);
                myItemsObject = await openmct.objects.get(myItemsIdentifier);
            });

            it('missing objects', () => {
                let idsMatch = openmct.objects.areIdsEqual(myItemsObject.identifier, myItemsIdentifier);

                expect(myItemsObject).toBeDefined();
                expect(idsMatch).toBeTrue();
            });
        });

    });

    describe('with a name argument passed in', () => {

        beforeEach((done) => {
            openmct = createOpenMct();
            openmct.install(openmct.plugins.MyItems(FANCY_NAME));

            spyOn(openmct.objects, 'isMissing').and.returnValue(true);

            openmct.on('start', done);
            openmct.startHeadless();
        });

        afterEach(() => {
            return resetApplicationState(openmct);
        });

        it('when installed, uses the passed in name', async () => {
            let myItems = await openmct.objects.get(myItemsIdentifier);

            expect(myItems.name).toBe(FANCY_NAME);
            expect(myItems).toBeDefined();
        });

    });

});
