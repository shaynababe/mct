/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import AlphaNumericFormatViewProvider from './AlphanumericFormatViewProvider.js';
import CopyToClipboardAction from './actions/CopyToClipboardAction';
import DisplayLayout from './components/DisplayLayout.vue';
import DisplayLayoutToolbar from './DisplayLayoutToolbar.js';
import DisplayLayoutType from './DisplayLayoutType.js';
import DisplayLayoutDrawingObjectTypes from './DrawingObjectTypes.js';

import objectUtils from 'objectUtils';

import Vue from 'vue';

class DisplayLayoutView {
    constructor(openmct, domainObject, objectPath, options) {
        this.openmct = openmct;
        this.domainObject = domainObject;
        this.objectPath = objectPath;
        this.options = options;

        this.component = undefined;
    }

    show(container, isEditing) {
        this.component = new Vue({
            el: container,
            components: {
                DisplayLayout
            },
            provide: {
                openmct: this.openmct,
                objectPath: this.objectPath,
                options: this.options,
                objectUtils,
                currentView: this
            },
            data: () => {
                return {
                    domainObject: this.domainObject,
                    isEditing
                };
            },
            template: '<display-layout ref="displayLayout" :domain-object="domainObject" :is-editing="isEditing"></display-layout>'
        });
    }

    getViewContext() {
        if (!this.component) {
            return {};
        }

        return this.component.$refs.displayLayout.getViewContext();
    }

    getSelectionContext() {
        return {
            item: this.domainObject,
            supportsMultiSelect: true,
            addElement: this.component && this.component.$refs.displayLayout.addElement,
            removeItem: this.component && this.component.$refs.displayLayout.removeItem,
            orderItem: this.component && this.component.$refs.displayLayout.orderItem,
            duplicateItem: this.component && this.component.$refs.displayLayout.duplicateItem,
            switchViewType: this.component && this.component.$refs.displayLayout.switchViewType,
            mergeMultipleTelemetryViews: this.component && this.component.$refs.displayLayout.mergeMultipleTelemetryViews,
            mergeMultipleOverlayPlots: this.component && this.component.$refs.displayLayout.mergeMultipleOverlayPlots,
            toggleGrid: this.component && this.component.$refs.displayLayout.toggleGrid
        };
    }

    onEditModeChange(isEditing) {
        this.component.isEditing = isEditing;
    }

    destroy() {
        this.component.$destroy();
        this.component = undefined;
    }
}

export default function DisplayLayoutPlugin(options) {
    return function (openmct) {
        openmct.actions.register(new CopyToClipboardAction(openmct));

        openmct.objectViews.addProvider({
            key: 'layout.view',
            canView: function (domainObject) {
                return domainObject.type === 'layout';
            },
            canEdit: function (domainObject) {
                return domainObject.type === 'layout';
            },
            view: function (domainObject, objectPath) {
                return new DisplayLayoutView(openmct, domainObject, objectPath, options);
            },
            priority() {
                return 100;
            }
        });
        openmct.types.addType('layout', DisplayLayoutType());
        openmct.toolbars.addProvider(new DisplayLayoutToolbar(openmct));
        openmct.inspectorViews.addProvider(new AlphaNumericFormatViewProvider(openmct, options));
        openmct.composition.addPolicy((parent, child) => {
            if (parent.type === 'layout' && child.type === 'folder') {
                return false;
            } else {
                return true;
            }
        });

        for (const [type, definition] of Object.entries(DisplayLayoutDrawingObjectTypes)) {
            openmct.types.addType(type, definition);
        }

        DisplayLayoutPlugin._installed = true;
    };
}
