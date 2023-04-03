/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([], function () {

    /**
     * A ToolbarRegistry maintains the definitions for toolbars.
     *
     * @interface ToolbarRegistry
     * @memberof module:openmct
     */
    function ToolbarRegistry() {
        this.providers = {};
    }

    /**
     * Gets toolbar controls from providers which can provide a toolbar for this selection.
     *
     * @param {object} selection the selection object
     * @returns {Object[]} an array of objects defining controls for the toolbar
     * @private for platform-internal use
     */
    ToolbarRegistry.prototype.get = function (selection) {
        const providers = this.getAllProviders().filter(function (provider) {
            return provider.forSelection(selection);
        });

        const structure = [];

        providers.forEach(provider => {
            provider.toolbar(selection).forEach(item => structure.push(item));
        });

        return structure;
    };

    /**
     * @private
     */
    ToolbarRegistry.prototype.getAllProviders = function () {
        return Object.values(this.providers);
    };

    /**
     * @private
     */
    ToolbarRegistry.prototype.getByProviderKey = function (key) {
        return this.providers[key];
    };

    /**
     * Registers a new type of toolbar.
     *
     * @param {module:openmct.ToolbarRegistry} provider the provider for this toolbar
     * @method addProvider
     * @memberof module:openmct.ToolbarRegistry#
     */
    ToolbarRegistry.prototype.addProvider = function (provider) {
        const key = provider.key;

        if (key === undefined) {
            throw "Toolbar providers must have a unique 'key' property defined.";
        }

        if (this.providers[key] !== undefined) {
            console.warn("Provider already defined for key '%s'. Provider keys must be unique.", key);
        }

        this.providers[key] = provider;
    };

    /**
     * Exposes types of toolbars in Open MCT.
     *
     * @interface ToolbarProvider
     * @property {string} key a unique identifier for this toolbar
     * @property {string} name the human-readable name of this toolbar
     * @property {string} [description] a longer-form description (typically
     *           a single sentence or short paragraph) of this kind of toolbar
     * @memberof module:openmct
     */

    /**
     * Checks if this provider can supply toolbar for a selection.
     *
     * @method forSelection
     * @memberof module:openmct.ToolbarProvider#
     * @param {module:openmct.selection} selection
     * @returns {boolean} 'true' if the toolbar applies to the provided selection,
     *          otherwise 'false'.
     */

    /**
     * Provides controls that comprise a toolbar.
     *
     * @method toolbar
     * @memberof module:openmct.ToolbarProvider#
     * @param {object} selection the selection object
     * @returns {Object[]} an array of objects defining controls for the toolbar.
     */

    return ToolbarRegistry;
});
