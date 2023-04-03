/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import EventEmitter from 'EventEmitter';
import _ from 'lodash';

class ActionCollection extends EventEmitter {
    constructor(applicableActions, objectPath, view, openmct, skipEnvironmentObservers) {
        super();

        this.applicableActions = applicableActions;
        this.openmct = openmct;
        this.objectPath = objectPath;
        this.view = view;
        this.skipEnvironmentObservers = skipEnvironmentObservers;
        this.objectUnsubscribes = [];

        let debounceOptions = {
            leading: false,
            trailing: true
        };

        this._updateActions = _.debounce(this._updateActions.bind(this), 150, debounceOptions);
        this._update = _.debounce(this._update.bind(this), 150, debounceOptions);

        if (!skipEnvironmentObservers) {
            this._observeObjectPath();
            this.openmct.editor.on('isEditing', this._updateActions);
        }
    }

    disable(actionKeys) {
        actionKeys.forEach(actionKey => {
            if (this.applicableActions[actionKey]) {
                this.applicableActions[actionKey].isDisabled = true;
            }
        });
        this._update();
    }

    enable(actionKeys) {
        actionKeys.forEach(actionKey => {
            if (this.applicableActions[actionKey]) {
                this.applicableActions[actionKey].isDisabled = false;
            }
        });
        this._update();
    }

    hide(actionKeys) {
        actionKeys.forEach(actionKey => {
            if (this.applicableActions[actionKey]) {
                this.applicableActions[actionKey].isHidden = true;
            }
        });
        this._update();
    }

    show(actionKeys) {
        actionKeys.forEach(actionKey => {
            if (this.applicableActions[actionKey]) {
                this.applicableActions[actionKey].isHidden = false;
            }
        });
        this._update();
    }

    destroy() {
        if (!this.skipEnvironmentObservers) {
            this.objectUnsubscribes.forEach(unsubscribe => {
                unsubscribe();
            });

            this.openmct.editor.off('isEditing', this._updateActions);
        }

        this.emit('destroy', this.view);
        this.removeAllListeners();
    }

    getVisibleActions() {
        let actionsArray = Object.keys(this.applicableActions);
        let visibleActions = [];

        actionsArray.forEach(actionKey => {
            let action = this.applicableActions[actionKey];

            if (!action.isHidden) {
                visibleActions.push(action);
            }
        });

        return visibleActions;
    }

    getStatusBarActions() {
        let actionsArray = Object.keys(this.applicableActions);
        let statusBarActions = [];

        actionsArray.forEach(actionKey => {
            let action = this.applicableActions[actionKey];

            if (action.showInStatusBar && !action.isDisabled && !action.isHidden) {
                statusBarActions.push(action);
            }
        });

        return statusBarActions;
    }

    getActionsObject() {
        return this.applicableActions;
    }

    _update() {
        this.emit('update', this.applicableActions);
    }

    _observeObjectPath() {
        let actionCollection = this;

        function updateObject(oldObject, newObject) {
            Object.assign(oldObject, newObject);

            actionCollection._updateActions();
        }

        this.objectPath.forEach(object => {
            if (object) {
                let unsubscribe = this.openmct.objects.observe(object, '*', updateObject.bind(this, object));

                this.objectUnsubscribes.push(unsubscribe);
            }
        });
    }

    _updateActions() {
        let newApplicableActions = this.openmct.actions._applicableActions(this.objectPath, this.view);

        this.applicableActions = this._mergeOldAndNewActions(this.applicableActions, newApplicableActions);
        this._update();
    }

    _mergeOldAndNewActions(oldActions, newActions) {
        let mergedActions = {};
        Object.keys(newActions).forEach(key => {
            if (oldActions[key]) {
                mergedActions[key] = oldActions[key];
            } else {
                mergedActions[key] = newActions[key];
            }
        });

        return mergedActions;
    }
}

export default ActionCollection;
