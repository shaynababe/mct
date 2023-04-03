/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import Menu, { MENU_PLACEMENT } from './menu.js';

/**
 * Popup Menu options
 * @typedef {Object} MenuOptions
 * @property {String} menuClass Class for popup menu
 * @property {MENU_PLACEMENT} placement Placement for menu relative to click
 * @property {Function} onDestroy callback function: invoked when menu is destroyed
 */

/**
 * Popup Menu Item/action
 * @typedef {Object} Action
 * @property {String} cssClass Class for menu item
 * @property {Boolean} isDisabled adds disable class if true
 * @property {String} name Menu item text
 * @property {String} description Menu item description
 * @property {Function} onItemClicked callback function: invoked when item is clicked
 */

/**
 * The MenuAPI allows the addition of new context menu actions, and for the context menu to be launched from
 * custom HTML elements.
 * @interface MenuAPI
 * @memberof module:openmct
 */

class MenuAPI {
    constructor(openmct) {
        this.openmct = openmct;

        this.menuPlacement = MENU_PLACEMENT;
        this.showMenu = this.showMenu.bind(this);
        this.showSuperMenu = this.showSuperMenu.bind(this);

        this._clearMenuComponent = this._clearMenuComponent.bind(this);
        this._showObjectMenu = this._showObjectMenu.bind(this);
    }

    /**
     * Show popup menu
     * @param {number} x x-coordinates for popup
     * @param {number} y x-coordinates for popup
     * @param {Array.<Action>|Array.<Array.<Action>>} actions collection of actions{@link Action} or collection of groups of actions {@link Action}
     * @param {MenuOptions} [menuOptions] [Optional] The {@link MenuOptions} options for Menu
     */
    showMenu(x, y, items, menuOptions) {
        this._createMenuComponent(x, y, items, menuOptions);

        this.menuComponent.showMenu();
    }

    actionsToMenuItems(actions, objectPath, view) {
        return actions.map(action => {
            const isActionGroup = Array.isArray(action);
            if (isActionGroup) {
                action = this.actionsToMenuItems(action, objectPath, view);
            } else {
                action.onItemClicked = () => {
                    action.invoke(objectPath, view);
                };
            }

            return action;
        });
    }

    /**
     * Show popup menu with description of item on hover
     * @param {number} x x-coordinates for popup
     * @param {number} y x-coordinates for popup
     * @param {Array.<Action>|Array.<Array.<Action>>} actions collection of actions {@link Action} or collection of groups of actions {@link Action}
     * @param {MenuOptions} [menuOptions] [Optional] The {@link MenuOptions} options for Menu
     */
    showSuperMenu(x, y, actions, menuOptions) {
        this._createMenuComponent(x, y, actions, menuOptions);

        this.menuComponent.showSuperMenu();
    }

    _clearMenuComponent() {
        this.menuComponent = undefined;
        delete this.menuComponent;
    }

    _createMenuComponent(x, y, actions, menuOptions = {}) {
        if (this.menuComponent) {
            this.menuComponent.dismiss();
        }

        let options = {
            x,
            y,
            actions,
            ...menuOptions
        };

        this.menuComponent = new Menu(options);
        this.menuComponent.once('destroy', this._clearMenuComponent);
    }

    _showObjectMenu(objectPath, x, y, actionsToBeIncluded) {
        let applicableActions = this.openmct.actions._groupedAndSortedObjectActions(objectPath, actionsToBeIncluded);

        this.showMenu(x, y, applicableActions);
    }
}
export default MenuAPI;
