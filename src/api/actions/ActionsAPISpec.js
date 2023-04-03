/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import ActionsAPI from './ActionsAPI';
import { createOpenMct, resetApplicationState } from '../../utils/testing';
import ActionCollection from './ActionCollection';

describe('The Actions API', () => {
    let openmct;
    let actionsAPI;
    let mockAction;
    let mockObjectPath;
    let mockObjectPathAction;
    let mockViewContext1;

    beforeEach(() => {
        openmct = createOpenMct();
        actionsAPI = new ActionsAPI(openmct);
        mockObjectPathAction = {
            name: 'Test Action Object Path',
            key: 'test-action-object-path',
            cssClass: 'test-action-object-path',
            description: 'This is a test action for object path',
            group: 'action',
            priority: 9,
            appliesTo: (objectPath) => {
                if (objectPath.length) {
                    return objectPath[0].type === 'fake-folder';
                }

                return false;
            },
            invoke: () => {
            }
        };
        mockAction = {
            name: 'Test Action View',
            key: 'test-action-view',
            cssClass: 'test-action-view',
            description: 'This is a test action for view',
            group: 'action',
            priority: 9,
            appliesTo: (objectPath, view = {}) => {
                if (view.getViewContext) {
                    let viewContext = view.getViewContext();

                    return viewContext.onlyAppliesToTestCase;
                }

                return false;
            },
            invoke: () => {
            }
        };
        mockObjectPath = [
            {
                name: 'mock folder',
                type: 'fake-folder',
                identifier: {
                    key: 'mock-folder',
                    namespace: ''
                }
            },
            {
                name: 'mock parent folder',
                type: 'fake-folder',
                identifier: {
                    key: 'mock-parent-folder',
                    namespace: ''
                }
            }
        ];
        mockViewContext1 = {
            getViewContext: () => {
                return {
                    onlyAppliesToTestCase: true
                };
            }
        };
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe("register method", () => {
        it("adds action to ActionsAPI", () => {
            actionsAPI.register(mockAction);

            let actionCollection = actionsAPI.getActionsCollection(mockObjectPath, mockViewContext1);
            let action = actionCollection.getActionsObject()[mockAction.key];

            expect(action.key).toEqual(mockAction.key);
            expect(action.name).toEqual(mockAction.name);
        });
    });

    describe("get method", () => {
        beforeEach(() => {
            actionsAPI.register(mockAction);
            actionsAPI.register(mockObjectPathAction);
        });

        it("returns an ActionCollection when invoked with an objectPath only", () => {
            let actionCollection = actionsAPI.getActionsCollection(mockObjectPath);
            let instanceOfActionCollection = actionCollection instanceof ActionCollection;

            expect(instanceOfActionCollection).toBeTrue();
        });

        it("returns an ActionCollection when invoked with an objectPath and view", () => {
            let actionCollection = actionsAPI.getActionsCollection(mockObjectPath, mockViewContext1);
            let instanceOfActionCollection = actionCollection instanceof ActionCollection;

            expect(instanceOfActionCollection).toBeTrue();
        });

        it("returns relevant actions when invoked with objectPath only", () => {
            let actionCollection = actionsAPI.getActionsCollection(mockObjectPath);
            let action = actionCollection.getActionsObject()[mockObjectPathAction.key];

            expect(action.key).toEqual(mockObjectPathAction.key);
            expect(action.name).toEqual(mockObjectPathAction.name);
        });

        it("returns relevant actions when invoked with objectPath and view", () => {
            let actionCollection = actionsAPI.getActionsCollection(mockObjectPath, mockViewContext1);
            let action = actionCollection.getActionsObject()[mockAction.key];

            expect(action.key).toEqual(mockAction.key);
            expect(action.name).toEqual(mockAction.name);
        });
    });
});
