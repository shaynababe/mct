/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import Preview from './Preview.vue';
import Vue from 'vue';
import EventEmitter from 'EventEmitter';

export default class PreviewAction extends EventEmitter {
    constructor(openmct) {
        super();
        /**
         * Metadata
         */
        this.name = 'View';
        this.key = 'preview';
        this.description = 'View in large dialog';
        this.cssClass = 'icon-items-expand';
        this.group = 'windowing';
        this.priority = 1;

        /**
         * Dependencies
         */
        this._openmct = openmct;

        if (PreviewAction.isVisible === undefined) {
            PreviewAction.isVisible = false;
        }
    }

    invoke(objectPath, viewOptions) {
        let preview = new Vue({
            components: {
                Preview
            },
            provide: {
                openmct: this._openmct,
                objectPath: objectPath
            },
            data() {
                return {
                    viewOptions
                };
            },
            template: '<Preview :view-options="viewOptions"></Preview>'
        });
        preview.$mount();

        let overlay = this._openmct.overlays.overlay({
            element: preview.$el,
            size: 'large',
            autoHide: false,
            buttons: [
                {
                    label: 'Done',
                    callback: () => overlay.dismiss()
                }
            ],
            onDestroy: () => {
                PreviewAction.isVisible = false;
                preview.$destroy();
                this.emit('isVisible', false);
            }
        });

        PreviewAction.isVisible = true;
        this.emit('isVisible', true);
    }

    appliesTo(objectPath, view = {}) {
        const parentElement = view.parentElement;
        const isObjectView = parentElement && parentElement.classList.contains('js-object-view');

        return !PreviewAction.isVisible
            && !this._openmct.router.isNavigatedObject(objectPath)
            && !isObjectView;
    }

    _preventPreview(objectPath) {
        const noPreviewTypes = ['folder'];

        return noPreviewTypes.includes(objectPath[0].type);
    }
}
