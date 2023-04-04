/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

describe("the plugin", () => {
    let openmct;
    let newFolderAction;

    beforeEach((done) => {
        openmct = createOpenMct();

        openmct.on('start', done);
        openmct.startHeadless();

        newFolderAction = openmct.actions._allActions.newFolder;
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('installs the new folder action', () => {
        expect(newFolderAction).toBeDefined();
    });

    describe('when invoked', () => {
        let parentObject;
        let parentObjectPath;
        let changedParentObject;
        let unobserve;
        beforeEach((done) => {
            parentObject = {
                name: 'mock folder',
                type: 'folder',
                identifier: {
                    key: 'mock-folder',
                    namespace: ''
                },
                composition: []
            };
            parentObjectPath = [parentObject];

            spyOn(openmct.objects, "save");
            openmct.objects.save.and.callThrough();

            spyOn(openmct.forms, "showForm");
            openmct.forms.showForm.and.callFake(formStructure => {
                return Promise.resolve({
                    name: 'test',
                    notes: 'test notes',
                    location: parentObjectPath
                });
            });

            unobserve = openmct.objects.observe(parentObject, '*', (newObject) => {
                changedParentObject = newObject;

                done();
            });

            newFolderAction.invoke(parentObjectPath);
        });
        afterEach(() => {
            unobserve();
        });

        it('creates a new folder object', () => {
            expect(openmct.objects.save).toHaveBeenCalled();
        });

        it('adds new folder object to parent composition', () => {
            const composition = changedParentObject.composition;

            expect(composition.length).toBe(1);
        });

        it('checks if the domainObject is persistable', () => {
            const mockObjectPath = [{
                name: 'mock folder',
                type: 'folder',
                identifier: {
                    key: 'mock-folder',
                    namespace: ''
                }
            }];

            spyOn(openmct.objects, 'isPersistable').and.returnValue(true);

            newFolderAction.appliesTo(mockObjectPath);

            expect(openmct.objects.isPersistable).toHaveBeenCalled();
        });
    });
});
