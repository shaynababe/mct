/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';
import Vue from 'vue';
import Layout from './Layout.vue';

describe('Open MCT Layout:', () => {
    let openmct;
    let element;
    let components;

    beforeEach((done) => {
        openmct = createOpenMct();
        openmct.on('start', done);

        // to silence error from BrowseBar.vue
        spyOn(openmct.objectViews, 'get')
            .and.callFake(() => []);

        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe('the pane:', () => {
        it('is displayed on layout load', async () => {
            await createLayout();
            await Vue.nextTick();

            Object.entries(components).forEach(([name, component]) => {
                expect(
                    component.pane
                ).toBeTruthy();

                expect(
                    isCollapsed(component.pane)
                ).toBeFalse();
            });
        });

        it('is collapsed on layout load if specified by a hide param', async () => {
            setHideParams();

            await createLayout();
            await Vue.nextTick();

            Object.entries(components).forEach(([name, component]) => {
                expect(
                    isCollapsed(component.pane)
                ).toBeTrue();
            });
        });

        it('on toggle collapses if expanded', async () => {
            await createLayout();
            toggleCollapseButtons();
            await Vue.nextTick();

            Object.entries(components).forEach(([name, component]) => {
                expect(
                    openmct.router.getSearchParam(component.param)
                ).toEqual('true');

                expect(
                    isCollapsed(component.pane)
                ).toBeTrue();
            });
        });

        it('on toggle expands if collapsed', async () => {
            setHideParams();

            await createLayout();
            toggleExpandButtons();
            await Vue.nextTick();

            Object.entries(components).forEach(([name, component]) => {
                expect(
                    openmct.router.getSearchParam(component.param)
                ).not.toEqual('true');

                expect(
                    isCollapsed(component.pane)
                ).toBeFalse();
            });
        });
    });

    async function createLayout() {
        const el = document.createElement('div');
        const child = document.createElement('div');
        el.appendChild(child);

        element = await new Vue({
            el,
            components: {
                Layout
            },
            provide: {
                openmct
            },
            template: `<Layout ref="layout"/>`
        }).$mount().$el;

        setComponents();
    }

    function setComponents() {
        components = {
            tree: {
                param: 'hideTree',
                pane: element.querySelector('.l-shell__pane-tree'),
                collapseButton: element.querySelector('.l-shell__pane-tree .l-pane__collapse-button'),
                expandButton: element.querySelector('.l-shell__pane-tree .l-pane__expand-button')
            },
            inspector: {
                param: 'hideInspector',
                pane: element.querySelector('.l-shell__pane-inspector'),
                collapseButton: element.querySelector('.l-shell__pane-inspector .l-pane__collapse-button'),
                expandButton: element.querySelector('.l-shell__pane-inspector .l-pane__expand-button')
            }
        };
    }

    function isCollapsed(el) {
        return el.classList.contains('l-pane--collapsed');
    }

    function setHideParams() {
        Object.entries(components).forEach(([name, component]) => {
            openmct.router.setSearchParam(component.param, true);
        });
    }

    function toggleCollapseButtons() {
        Object.entries(components).forEach(([name, component]) => {
            component.collapseButton.click();
        });
    }

    function toggleExpandButtons() {
        Object.entries(components).forEach(([name, component]) => {
            component.expandButton.click();
        });
    }
});
