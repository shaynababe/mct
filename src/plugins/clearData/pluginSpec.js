/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import ClearDataPlugin from './plugin.js';
import Vue from 'vue';
import { createOpenMct, resetApplicationState, createMouseEvent } from 'utils/testing';

describe('The Clear Data Plugin:', () => {
    let clearDataPlugin;

    describe('The clear data action:', () => {
        let openmct;
        let selection;
        let mockObjectPath;
        let clearDataAction;
        let testViewObject;
        beforeEach((done) => {
            openmct = createOpenMct();

            clearDataPlugin = new ClearDataPlugin(
                ['table', 'telemetry.plot.overlay', 'telemetry.plot.stacked'],
                {indicator: true}
            );
            openmct.install(clearDataPlugin);

            clearDataAction = openmct.actions.getAction('clear-data-action');
            testViewObject = [{
                identifier: {
                    key: "foo-table",
                    namespace: ''
                },
                type: "table"
            }];
            openmct.router.path = testViewObject;
            mockObjectPath = [
                {
                    name: 'Mock Table',
                    type: 'table',
                    identifier: {
                        key: "foo-table",
                        namespace: ''
                    }
                }
            ];
            selection = [
                {
                    context: {
                        item: mockObjectPath[0]
                    }
                }
            ];

            openmct.selection.select(selection);

            openmct.on('start', done);
            openmct.startHeadless();
        });

        afterEach(() => {
            openmct.router.path = null;

            return resetApplicationState(openmct);
        });
        it('is installed', () => {
            expect(clearDataAction).toBeDefined();
        });

        it('is applicable on applicable objects', () => {
            const gatheredActions = openmct.actions.getActionsCollection(mockObjectPath);
            expect(gatheredActions.applicableActions['clear-data-action']).toBeDefined();
        });

        it('is not applicable on inapplicable objects', () => {
            testViewObject = [{
                identifier: {
                    key: "foo-widget",
                    namespace: ''
                },
                type: "widget"
            }];
            mockObjectPath = [
                {
                    name: 'Mock Widget',
                    type: 'widget',
                    identifier: {
                        key: "foo-widget",
                        namespace: ''
                    }
                }
            ];
            selection = [
                {
                    context: {
                        item: mockObjectPath[0]
                    }
                }
            ];
            openmct.selection.select(selection);
            const gatheredActions = openmct.actions.getActionsCollection(mockObjectPath);
            expect(gatheredActions.applicableActions['clear-data-action']).toBeUndefined();
        });

        it('is not applicable if object not in the selection path and not a layout', () => {
            selection = [
                {
                    context: {
                        item: {
                            name: 'Some Random Widget',
                            type: 'not-in-path-widget',
                            identifier: {
                                key: "something-else-widget",
                                namespace: ''
                            }
                        }
                    }
                }
            ];
            openmct.selection.select(selection);
            const gatheredActions = openmct.actions.getActionsCollection(mockObjectPath);
            expect(gatheredActions.applicableActions['clear-data-action']).toBeUndefined();
        });

        it('is applicable if object not in the selection path and is a layout', () => {
            selection = [
                {
                    context: {
                        item: {
                            name: 'Some Random Widget',
                            type: 'not-in-path-widget',
                            identifier: {
                                key: "something-else-widget",
                                namespace: ''
                            }
                        }
                    }
                }
            ];

            openmct.selection.select(selection);

            testViewObject = [{
                identifier: {
                    key: "foo-layout",
                    namespace: ''
                },
                type: "layout"
            }];
            openmct.router.path = testViewObject;
            const gatheredActions = openmct.actions.getActionsCollection(mockObjectPath);
            expect(gatheredActions.applicableActions['clear-data-action']).toBeDefined();
        });

        it('fires an event upon invocation', (done) => {
            openmct.objectViews.on('clearData', (domainObject) => {
                expect(domainObject).toEqual(testViewObject[0]);
                done();
            });
            clearDataAction.invoke(testViewObject);
        });
    });

    describe('The clear data indicator:', () => {
        let openmct;
        let appHolder;

        beforeEach((done) => {
            openmct = createOpenMct();

            clearDataPlugin = new ClearDataPlugin([
                'table',
                'telemetry.plot.overlay',
                'telemetry.plot.stacked',
                'example.imagery'
            ], {
                indicator: true
            });
            openmct.install(clearDataPlugin);
            appHolder = document.createElement('div');
            document.body.appendChild(appHolder);
            openmct.on('start', done);
            openmct.start(appHolder);
        });

        it('installs', () => {
            const globalClearIndicator = openmct.indicators.indicatorObjects
                .find(indicator => indicator.key === 'global-clear-indicator').element;
            expect(globalClearIndicator).toBeDefined();
        });

        it("renders its major elements", async () => {
            await Vue.nextTick();
            const indicatorClass = appHolder.querySelector('.c-indicator');
            const iconClass = appHolder.querySelector('.icon-clear-data');
            const indicatorLabel = appHolder.querySelector('.c-indicator__label');
            const buttonElement = indicatorLabel.querySelector('button');
            const hasMajorElements = Boolean(indicatorClass && iconClass && buttonElement);

            expect(hasMajorElements).toBe(true);
            expect(buttonElement.innerText).toEqual('Clear Data');
        });

        it("clicking the button fires the global clear", (done) => {
            const indicatorLabel = appHolder.querySelector('.c-indicator__label');
            const buttonElement = indicatorLabel.querySelector('button');
            const clickEvent = createMouseEvent('click');
            openmct.objectViews.on('clearData', () => {
                // when we click the button, this event should fire
                done();
            });
            buttonElement.dispatchEvent(clickEvent);
        });
    });
});
