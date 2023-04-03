/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import LinkActionPlugin from './plugin.js';
import LinkAction from './LinkAction.js';
import {
    createOpenMct,
    resetApplicationState,
    getMockObjects
} from 'utils/testing';

describe("The Link Action plugin", () => {
    let openmct;
    let linkAction;
    let childObject;
    let parentObject;
    let anotherParentObject;
    const ORIGINAL_PARENT_ID = 'original-parent-object';
    const LINK_ACITON_KEY = 'link';
    const LINK_ACITON_NAME = 'Create Link';

    beforeEach((done) => {
        const appHolder = document.createElement('div');
        appHolder.style.width = '640px';
        appHolder.style.height = '480px';

        openmct = createOpenMct();

        childObject = getMockObjects({
            objectKeyStrings: ['folder'],
            overwrite: {
                folder: {
                    name: "Child Folder",
                    location: ORIGINAL_PARENT_ID,
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
                    name: "Parent Folder",
                    identifier: {
                        namespace: "",
                        key: "original-parent-object"
                    },
                    composition: [childObject.identifier]
                }
            }
        }).folder;

        anotherParentObject = getMockObjects({
            objectKeyStrings: ['folder'],
            overwrite: {
                folder: {
                    name: "Another Parent Folder"
                }
            }
        }).folder;

        openmct.router.path = [childObject]; // preview action uses this in it's applyTo method

        openmct.install(LinkActionPlugin());

        openmct.on('start', done);
        openmct.startHeadless(appHolder);
    });

    afterEach(() => {
        resetApplicationState(openmct);
    });

    it("should be defined", () => {
        expect(LinkActionPlugin).toBeDefined();
    });

    it("should make the link action available for an appropriate domainObject", () => {
        const actionCollection = openmct.actions.getActionsCollection([childObject]);
        const visibleActions = actionCollection.getVisibleActions();
        linkAction = visibleActions.find(a => a.key === LINK_ACITON_KEY);

        expect(linkAction.name).toEqual(LINK_ACITON_NAME);
    });

    describe("when linking an object in a new parent", () => {
        beforeEach(() => {
            linkAction = new LinkAction(openmct);
            linkAction.linkInNewParent(childObject, anotherParentObject);
        });

        it("the child object's identifier should be in the new parent's composition and location set to original parent", () => {
            let newParentChild = anotherParentObject.composition[0];
            expect(newParentChild).toEqual(childObject.identifier);
            expect(childObject.location).toEqual(ORIGINAL_PARENT_ID);
        });

        it("the child object's identifier should remain in the original parent's composition", () => {
            let oldParentCompositionChild = parentObject.composition[0];
            expect(oldParentCompositionChild).toEqual(childObject.identifier);
        });
    });
});
