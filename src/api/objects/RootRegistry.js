/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import utils from './object-utils';

export default class RootRegistry {

    constructor(openmct) {
        this._rootItems = [];
        this._openmct = openmct;
    }

    getRoots() {
        const sortedItems = this._rootItems.sort((a, b) => b.priority - a.priority);
        const promises = sortedItems.map((rootItem) => rootItem.provider());

        return Promise.all(promises).then(rootItems => rootItems.flat());
    }

    addRoot(rootItem, priority) {

        if (!this._isValid(rootItem)) {
            return;
        }

        this._rootItems.push({
            priority: priority || this._openmct.priority.DEFAULT,
            provider: typeof rootItem === 'function' ? rootItem : () => rootItem
        });
    }

    _isValid(rootItem) {
        if (utils.isIdentifier(rootItem) || typeof rootItem === 'function') {
            return true;
        }

        if (Array.isArray(rootItem)) {
            return rootItem.every(utils.isIdentifier);
        }

        return false;
    }
}
