/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


function inSelectionPath(openmct, domainObject) {
    const domainObjectIdentifier = domainObject.identifier;

    return openmct.selection.get().some(selectionPath => {
        return selectionPath.some(objectInPath => {
            const objectInPathIdentifier = objectInPath.context.item.identifier;

            return openmct.objects.areIdsEqual(objectInPathIdentifier, domainObjectIdentifier);
        });
    });
}

export default class ClearDataAction {
    constructor(openmct, appliesToObjects) {
        this.name = 'Clear Data for Object';
        this.key = 'clear-data-action';
        this.description = 'Clears current data for object, unsubscribes and resubscribes to data';
        this.cssClass = 'icon-clear-data';

        this._openmct = openmct;
        this._appliesToObjects = appliesToObjects;
    }
    invoke(objectPath) {
        let domainObject = null;
        if (objectPath) {
            domainObject = objectPath[0];
        }

        this._openmct.objectViews.emit('clearData', domainObject);
    }
    appliesTo(objectPath) {
        if (!objectPath) {
            return false;
        }

        const contextualDomainObject = objectPath[0];
        // first check to see if this action applies to this sort of object at all
        const appliesToThisObject = this._appliesToObjects.some(type => {
            return contextualDomainObject.type === type;
        });
        if (!appliesToThisObject) {
            // we've selected something not applicable
            return false;
        }

        const objectInSelectionPath = inSelectionPath(this._openmct, contextualDomainObject);
        if (objectInSelectionPath) {
            return true;
        } else {
            // if this it doesn't match up, check to see if we're in a composition (i.e., layout)
            const routerPath = this._openmct.router.path[0];

            return routerPath.type === 'layout';
        }
    }
}
