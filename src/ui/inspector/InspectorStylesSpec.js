/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';
import {
    mockLocalStorage
} from 'utils/testing/mockLocalStorage';
import {
    mockTelemetryTableSelection,
    mockMultiSelectionSameStyles,
    mockMultiSelectionMixedStyles,
    mockMultiSelectionNonSpecificStyles,
    mockStyle
} from './InspectorStylesSpecMocks';
import Vue from 'vue';
import StylesView from '@/plugins/condition/components/inspector/StylesView.vue';
import SavedStylesView from '../../plugins/inspectorViews/styles/SavedStylesView.vue';
import stylesManager from '../../plugins/inspectorViews/styles/StylesManager';

describe("the inspector", () => {
    let openmct;
    let selection;
    let stylesViewComponent;
    let savedStylesViewComponent;

    mockLocalStorage();

    beforeEach((done) => {
        openmct = createOpenMct();
        spyOn(openmct.objects, 'save').and.returnValue(Promise.resolve(true));
        openmct.on('start', done);
        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it("should allow a style to be saved", () => {
        selection = mockTelemetryTableSelection;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        expect(savedStylesViewComponent.$children[0].savedStyles.length).toBe(0);

        stylesViewComponent.$children[0].saveStyle(mockStyle);

        expect(savedStylesViewComponent.$children[0].savedStyles.length).toBe(1);
    });

    it("should display all saved styles", () => {
        selection = mockTelemetryTableSelection;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        expect(savedStylesViewComponent.$children[0].$children.length).toBe(0);
        stylesViewComponent.$children[0].saveStyle(mockStyle);

        return stylesViewComponent.$nextTick().then(() => {
            expect(savedStylesViewComponent.$children[0].$children.length).toBe(1);
        });
    });

    xit("should allow a saved style to be applied", () => {
        spyOn(openmct.editor, 'isEditing').and.returnValue(true);

        selection = mockTelemetryTableSelection;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        stylesViewComponent.$children[0].saveStyle(mockStyle);

        return stylesViewComponent.$nextTick().then(() => {
            const styleSelectorComponent = savedStylesViewComponent.$children[0].$children[0];

            styleSelectorComponent.selectStyle();

            return savedStylesViewComponent.$nextTick().then(() => {
                const styleEditorComponentIndex = stylesViewComponent.$children[0].$children.length - 1;
                const styleEditorComponent = stylesViewComponent.$children[0].$children[styleEditorComponentIndex];
                const styles = styleEditorComponent.$children.filter(component => component.options.value === mockStyle.color);

                expect(styles.length).toBe(3);
            });
        });
    });

    it("should allow a saved style to be deleted", () => {
        selection = mockTelemetryTableSelection;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        stylesViewComponent.$children[0].saveStyle(mockStyle);

        expect(savedStylesViewComponent.$children[0].savedStyles.length).toBe(1);

        savedStylesViewComponent.$children[0].deleteStyle(0);

        expect(savedStylesViewComponent.$children[0].savedStyles.length).toBe(0);
    });

    it("should prevent a style from being saved when the number of saved styles is at the limit", () => {
        spyOn(SavedStylesView.methods, 'showLimitReachedDialog').and.callThrough();

        selection = mockTelemetryTableSelection;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        for (let i = 1; i <= 20; i++) {
            stylesViewComponent.$children[0].saveStyle(mockStyle);
        }

        expect(SavedStylesView.methods.showLimitReachedDialog).not.toHaveBeenCalled();
        expect(savedStylesViewComponent.$children[0].savedStyles.length).toBe(20);

        stylesViewComponent.$children[0].saveStyle(mockStyle);

        expect(SavedStylesView.methods.showLimitReachedDialog).toHaveBeenCalled();
        expect(savedStylesViewComponent.$children[0].savedStyles.length).toBe(20);
    });

    it("should allow styles from multi-selections to be saved", () => {
        spyOn(openmct.editor, 'isEditing').and.returnValue(true);

        selection = mockMultiSelectionSameStyles;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        return stylesViewComponent.$nextTick().then(() => {
            const styleEditorComponentIndex = stylesViewComponent.$children[0].$children.length - 1;
            const styleEditorComponent = stylesViewComponent.$children[0].$children[styleEditorComponentIndex];
            const saveStyleButtonIndex = styleEditorComponent.$children.length - 1;
            const saveStyleButton = styleEditorComponent.$children[saveStyleButtonIndex];

            expect(saveStyleButton.$listeners.click).not.toBe(undefined);

            saveStyleButton.$listeners.click();

            expect(savedStylesViewComponent.$children[0].savedStyles.length).toBe(1);
        });
    });

    it("should prevent mixed styles from being saved", () => {
        spyOn(openmct.editor, 'isEditing').and.returnValue(true);

        selection = mockMultiSelectionMixedStyles;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        return stylesViewComponent.$nextTick().then(() => {
            const styleEditorComponentIndex = stylesViewComponent.$children[0].$children.length - 1;
            const styleEditorComponent = stylesViewComponent.$children[0].$children[styleEditorComponentIndex];
            const saveStyleButtonIndex = styleEditorComponent.$children.length - 1;
            const saveStyleButton = styleEditorComponent.$children[saveStyleButtonIndex];

            expect(saveStyleButton.$listeners.click).toBe(undefined);
        });
    });

    it("should prevent non-specific styles from being saved", () => {
        spyOn(openmct.editor, 'isEditing').and.returnValue(true);

        selection = mockMultiSelectionNonSpecificStyles;
        stylesViewComponent = createViewComponent(StylesView, selection, openmct);
        savedStylesViewComponent = createViewComponent(SavedStylesView, selection, openmct);

        return stylesViewComponent.$nextTick().then(() => {
            const styleEditorComponentIndex = stylesViewComponent.$children[0].$children.length - 1;
            const styleEditorComponent = stylesViewComponent.$children[0].$children[styleEditorComponentIndex];
            const saveStyleButtonIndex = styleEditorComponent.$children.length - 1;
            const saveStyleButton = styleEditorComponent.$children[saveStyleButtonIndex];

            expect(saveStyleButton.$listeners.click).toBe(undefined);
        });
    });

    function createViewComponent(component) {
        const element = document.createElement('div');
        const child = document.createElement('div');
        element.appendChild(child);

        const config = {
            provide: {
                openmct,
                selection,
                stylesManager
            },
            el: element,
            components: {},
            template: `<${component.name} />`
        };

        config.components[component.name] = component;

        return new Vue(config).$mount();
    }
});
