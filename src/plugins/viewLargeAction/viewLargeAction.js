/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import Preview from '@/ui/preview/Preview.vue';

import Vue from 'vue';

export default class ViewLargeAction {
    constructor(openmct) {
        this.openmct = openmct;

        this.cssClass = 'icon-items-expand';
        this.description = 'View Large';
        this.group = 'windowing';
        this.key = 'large.view';
        this.name = 'Large View';
        this.priority = 1;
        this.showInStatusBar = true;
    }

    invoke(objectPath, view) {
        performance.mark('viewlarge.start');
        const childElement = view?.parentElement?.firstChild;
        if (!childElement) {
            const message = "ViewLargeAction: missing element";
            this.openmct.notifications.error(message);
            throw new Error(message);
        }

        this._expand(objectPath, view);
    }

    appliesTo(objectPath, view) {
        const childElement = view?.parentElement?.firstChild;

        return childElement && !childElement.classList.contains('js-main-container')
            && !this.openmct.router.isNavigatedObject(objectPath);
    }

    _expand(objectPath, view) {
        const element = this._getPreview(objectPath, view);
        view.onPreviewModeChange?.({ isPreviewing: true });

        this.overlay = this.openmct.overlays.overlay({
            element,
            size: 'large',
            autoHide: false,
            onDestroy: () => {
                this.preview.$destroy();
                this.preview = undefined;
                delete this.preview;
                view.onPreviewModeChange?.();
            }
        });
    }

    _getPreview(objectPath, view) {
        this.preview = new Vue({
            components: {
                Preview
            },
            provide: {
                openmct: this.openmct,
                objectPath
            },
            data() {
                return {
                    view
                };
            },
            template: '<Preview :existing-view="view"></Preview>'
        });

        return this.preview.$mount().$el;
    }
}
