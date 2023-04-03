/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import EventEmitter from 'EventEmitter';
import ActionCollection from './ActionCollection';
import _ from 'lodash';

class ActionsAPI extends EventEmitter {
    constructor(openmct) {
        super();

        this._allActions = {};
        this._actionCollections = new WeakMap();
        this._openmct = openmct;

        this._groupOrder = ['windowing', 'undefined', 'view', 'action', 'export', 'import'];

        this.register = this.register.bind(this);
        this.getActionsCollection = this.getActionsCollection.bind(this);
        this._applicableActions = this._applicableActions.bind(this);
        this._updateCachedActionCollections = this._updateCachedActionCollections.bind(this);
    }

    register(actionDefinition) {
        this._allActions[actionDefinition.key] = actionDefinition;
    }

    getAction(key) {
        return this._allActions[key];
    }

    getActionsCollection(objectPath, view) {
        if (view) {
            return this._getCachedActionCollection(objectPath, view) || this._newActionCollection(objectPath, view, true);
        } else {
            return this._newActionCollection(objectPath, view, true);
        }
    }

    updateGroupOrder(groupArray) {
        this._groupOrder = groupArray;
    }

    _getCachedActionCollection(objectPath, view) {
        return this._actionCollections.get(view);
    }

    _newActionCollection(objectPath, view, skipEnvironmentObservers) {
        let applicableActions = this._applicableActions(objectPath, view);

        const actionCollection = new ActionCollection(applicableActions, objectPath, view, this._openmct, skipEnvironmentObservers);
        if (view) {
            this._cacheActionCollection(view, actionCollection);
        }

        return actionCollection;
    }

    _cacheActionCollection(view, actionCollection) {
        this._actionCollections.set(view, actionCollection);
        actionCollection.on('destroy', this._updateCachedActionCollections);
    }

    _updateCachedActionCollections(key) {
        if (this._actionCollections.has(key)) {
            let actionCollection = this._actionCollections.get(key);
            actionCollection.off('destroy', this._updateCachedActionCollections);

            this._actionCollections.delete(key);
        }
    }

    _applicableActions(objectPath, view) {
        let actionsObject = {};

        let keys = Object.keys(this._allActions).filter(key => {
            let actionDefinition = this._allActions[key];

            if (actionDefinition.appliesTo === undefined) {
                return true;
            } else {
                return actionDefinition.appliesTo(objectPath, view);
            }
        });

        keys.forEach(key => {
            let action = _.clone(this._allActions[key]);

            actionsObject[key] = action;
        });

        return actionsObject;
    }

    _groupAndSortActions(actionsArray = []) {
        if (!Array.isArray(actionsArray) && typeof actionsArray === 'object') {
            actionsArray = Object.keys(actionsArray).map(key => actionsArray[key]);
        }

        let actionsObject = {};
        let groupedSortedActionsArray = [];

        function sortDescending(a, b) {
            return b.priority - a.priority;
        }

        actionsArray.forEach(action => {
            if (actionsObject[action.group] === undefined) {
                actionsObject[action.group] = [action];
            } else {
                actionsObject[action.group].push(action);
            }
        });

        this._groupOrder.forEach(group => {
            let groupArray = actionsObject[group];

            if (groupArray) {
                groupedSortedActionsArray.push(groupArray.sort(sortDescending));
            }
        });

        return groupedSortedActionsArray;
    }
}

export default ActionsAPI;
