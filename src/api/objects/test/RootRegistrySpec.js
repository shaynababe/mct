/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { createOpenMct, resetApplicationState } from '../../../utils/testing';

describe('RootRegistry', () => {
    let openmct;
    let idA;
    let idB;
    let idC;
    let idD;

    beforeEach((done) => {
        openmct = createOpenMct();
        idA = {
            key: 'keyA',
            namespace: 'something'
        };
        idB = {
            key: 'keyB',
            namespace: 'something'
        };
        idC = {
            key: 'keyC',
            namespace: 'something'
        };
        idD = {
            key: 'keyD',
            namespace: 'something'
        };

        openmct.on('start', done);
        openmct.startHeadless();
    });

    afterEach(async () => {
        await resetApplicationState(openmct);
    });

    it('can register a root by identifier', () => {
        openmct.objects.addRoot(idA);

        return openmct.objects.getRoot()
            .then((rootObject) => {
                expect(rootObject.composition).toEqual([idA]);
            });
    });

    it('can register multiple roots by identifier', () => {
        openmct.objects.addRoot([idA, idB]);

        return openmct.objects.getRoot()
            .then((rootObject) => {
                expect(rootObject.composition).toEqual([idA, idB]);
            });
    });

    it('can register an asynchronous root ', () => {
        openmct.objects.addRoot(() => Promise.resolve(idA));

        return openmct.objects.getRoot()
            .then((rootObject) => {
                expect(rootObject.composition).toEqual([idA]);
            });
    });

    it('can register multiple asynchronous roots', () => {
        openmct.objects.addRoot(() => Promise.resolve([idA, idB]));

        return openmct.objects.getRoot()
            .then((rootObject) => {
                expect(rootObject.composition).toEqual([idA, idB]);
            });
    });

    it('can combine different types of registration', () => {
        openmct.objects.addRoot([idA, idB]);
        openmct.objects.addRoot(() => Promise.resolve([idC]));

        return openmct.objects.getRoot()
            .then((rootObject) => {
                expect(rootObject.composition).toEqual([idA, idB, idC]);
            });
    });

    it('supports priority ordering for identifiers', () => {
        openmct.objects.addRoot(idA, openmct.priority.LOW);
        openmct.objects.addRoot(idB, openmct.priority.HIGH);
        openmct.objects.addRoot(idC); // DEFAULT

        return openmct.objects.getRoot()
            .then((rootObject) => {
                expect(rootObject.composition[0]).toEqual(idB);
                expect(rootObject.composition[1]).toEqual(idC);
                expect(rootObject.composition[2]).toEqual(idA);
            });
    });

    it('supports priority ordering for different types of registration', () => {
        openmct.objects.addRoot(() => Promise.resolve([idC]), openmct.priority.LOW);
        openmct.objects.addRoot(idB, openmct.priority.HIGH);
        openmct.objects.addRoot([idA, idD]); // default

        return openmct.objects.getRoot()
            .then((rootObject) => {
                expect(rootObject.composition[0]).toEqual(idB);
                expect(rootObject.composition[1]).toEqual(idA);
                expect(rootObject.composition[2]).toEqual(idD);
                expect(rootObject.composition[3]).toEqual(idC);
            });
    });
});
