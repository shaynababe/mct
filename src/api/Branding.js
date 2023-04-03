/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

let brandingOptions = {};

/**
 * @typedef {object} BrandingOptions
 * @property {string} smallLogoImage URL to the image to use as the applications logo.
 * This logo will appear on every screen and when clicked will launch the about dialog.
 * @property {string} aboutHtml Custom content for the about screen. When defined the
 * supplied content will be inserted at the start of the about dialog, and the default
 * Open MCT splash logo will be suppressed.
 */

/**
 * Set branding options for the application. These will override certain visual elements
 * of the application and allow for customization of the application.
 * @param {BrandingOptions} options
 */
export default function Branding(options) {
    if (arguments.length === 1) {
        brandingOptions = options;
    }

    return brandingOptions;
}
