/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import {
    createOpenMct,
    resetApplicationState,
    getMockObjects
} from 'utils/testing';

describe("The Remove Action plugin", () => {

    let openmct;
    let removeAction;
    let childObject;
    let parentObject;

    // this setups up the app
    beforeEach((done) => {
        openmct = createOpenMct();

        childObject = getMockObjects({
            objectKeyStrings: ['folder'],
            overwrite: {
                folder: {
                    name: "Child Folder",
                    identifier: {
                        namespace: "",
                        key: "child-folder-object"
                    }
                }
            }
        }).folder;
        parentObject = getMockObjects({
            objectKeyStrings: ['folder'],
            overwrite: {
                folder: {
                    identifier: {
                        namespace: "",
                        key: "parent-folder-object"
                    },
                    name: "Parent Folder",
                    composition: [childObject.identifier]
                }
            }
        }).folder;

        openmct.on('start', done);
        openmct.startHeadless();

        removeAction = openmct.actions._allActions.remove;
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it("should be defined", () => {
        expect(removeAction).toBeDefined();
    });

    describe("when removing an object from a parent composition", () => {

        beforeEach(() => {
            spyOn(removeAction, 'removeFromComposition').and.callThrough();
            spyOn(removeAction, 'inNavigationPath').and.returnValue(false);
            spyOn(openmct.objects, 'mutate').and.callThrough();
            spyOn(openmct.objects, 'startTransaction').and.callThrough();
            spyOn(openmct.objects, 'endTransaction').and.callThrough();
            removeAction.removeFromComposition(parentObject, childObject);
        });

        it("removeFromComposition should be called with the parent and child", () => {
            expect(removeAction.removeFromComposition).toHaveBeenCalled();
            expect(removeAction.removeFromComposition).toHaveBeenCalledWith(parentObject, childObject);
        });

        it("it should mutate the parent object", () => {
            expect(openmct.objects.mutate).toHaveBeenCalled();
            expect(openmct.objects.mutate.calls.argsFor(0)[0]).toEqual(parentObject);
        });

        it("it should start a transaction", () => {
            expect(openmct.objects.startTransaction).toHaveBeenCalled();
        });

        it("it should end the transaction", (done) => {
            setTimeout(() => {
                expect(openmct.objects.endTransaction).toHaveBeenCalled();
                done();
            }, 100);
        });
    });

    describe("when determining the object is applicable", () => {

        beforeEach(() => {
            spyOn(removeAction, 'appliesTo').and.callThrough();
        });

        it("should be true when the parent is creatable and has composition", () => {
            let applies = removeAction.appliesTo([childObject, parentObject]);
            expect(applies).toBe(true);
        });

        it("should be false when the child is locked and not an alias", () => {
            childObject.locked = true;
            childObject.location = 'parent-folder-object';
            let applies = removeAction.appliesTo([childObject, parentObject]);
            expect(applies).toBe(false);
        });

        it("should be true when the child is locked and IS an alias", () => {
            childObject.locked = true;
            childObject.location = 'other-folder-object';
            let applies = removeAction.appliesTo([childObject, parentObject]);
            expect(applies).toBe(true);
        });
    });
});
