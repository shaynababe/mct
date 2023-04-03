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

describe("The Move Action plugin", () => {
    let openmct;
    let moveAction;
    let childObject;
    let parentObject;
    let anotherParentObject;

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
                    },
                    location: "parent-folder-object"
                }
            }
        }).folder;

        parentObject = getMockObjects({
            objectKeyStrings: ['folder'],
            overwrite: {
                folder: {
                    name: "Parent Folder",
                    composition: [childObject.identifier],
                    identifier: {
                        namespace: "",
                        key: "parent-folder-object"
                    }
                }
            }
        }).folder;

        anotherParentObject = getMockObjects({
            objectKeyStrings: ['folder'],
            overwrite: {
                folder: {
                    name: "Another Parent Folder",
                    identifier: {
                        namespace: "",
                        key: "another-parent-folder-object"
                    }
                }
            }
        }).folder;

        openmct.on('start', done);
        openmct.startHeadless();

        moveAction = openmct.actions._allActions.move;
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it("should be defined", () => {
        expect(moveAction).toBeDefined();
    });

    describe("when determining the object is applicable", () => {

        beforeEach(() => {
            spyOn(moveAction, 'appliesTo').and.callThrough();
        });

        it("should be true when the parent is creatable and has composition", () => {
            let applies = moveAction.appliesTo([childObject, parentObject]);
            expect(applies).toBe(true);
        });

        it("should be true when the child is locked and not an alias", () => {
            childObject.locked = true;
            let applies = moveAction.appliesTo([childObject, parentObject]);
            expect(applies).toBe(true);
        });

        it("should still be true when the child is locked and is an alias", () => {
            childObject.locked = true;
            childObject.location = 'another-parent-folder-object';
            let applies = moveAction.appliesTo([childObject, parentObject]);
            expect(applies).toBe(true);
        });
    });

    describe("when moving an object to a new parent and removing from the old parent", () => {
        let unObserve;
        beforeEach((done) => {
            openmct.router.path = [];

            spyOn(openmct.objects, "save");
            openmct.objects.save.and.callThrough();
            spyOn(openmct.forms, "showForm");
            openmct.forms.showForm.and.callFake(formStructure => {
                return Promise.resolve({
                    name: 'test',
                    location: [anotherParentObject]
                });
            });

            unObserve = openmct.objects.observe(parentObject, '*', (newObject) => {
                done();
            });

            moveAction.inNavigationPath = () => false;

            moveAction.invoke([childObject, parentObject]);
        });

        afterEach(() => {
            unObserve();
        });

        it("the child object's identifier should be in the new parent's composition", () => {
            let newParentChild = anotherParentObject.composition[0];
            expect(newParentChild).toEqual(childObject.identifier);
        });

        it("the child object's identifier should be removed from the old parent's composition", () => {
            let oldParentComposition = parentObject.composition;
            expect(oldParentComposition.length).toEqual(0);
        });
    });
});
