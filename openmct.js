/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
/*global module*/

const matcher = /\/openmct.js$/;
if (document.currentScript) {
    let src = document.currentScript.src;
    if (src && matcher.test(src)) {
        // eslint-disable-next-line no-undef
        __webpack_public_path__ = src.replace(matcher, '') + '/';
    }
}

/**
 * @typedef {object} BuildInfo
 * @property {string} version
 * @property {string} buildDate
 * @property {string} revision
 * @property {string} branch
 */

/**
 * @typedef {object} OpenMCT
 * @property {BuildInfo} buildInfo
 * @property {*} selection
 * @property {import('./src/api/time/TimeAPI').default} time
 * @property {import('./src/api/composition/CompositionAPI').default} composition
 * @property {*} objectViews
 * @property {*} inspectorViews
 * @property {*} propertyEditors
 * @property {*} toolbars
 * @property {*} types
 * @property {import('./src/api/objects/ObjectAPI').default} objects
 * @property {import('./src/api/telemetry/TelemetryAPI').default} telemetry
 * @property {import('./src/api/indicators/IndicatorAPI').default} indicators
 * @property {import('./src/api/user/UserAPI').default} user
 * @property {import('./src/api/notifications/NotificationAPI').default} notifications
 * @property {import('./src/api/Editor').default} editor
 * @property {import('./src/api/overlays/OverlayAPI')} overlays
 * @property {import('./src/api/menu/MenuAPI').default} menus
 * @property {import('./src/api/actions/ActionsAPI').default} actions
 * @property {import('./src/api/status/StatusAPI').default} status
 * @property {*} priority
 * @property {import('./src/ui/router/ApplicationRouter')} router
 * @property {import('./src/api/faultmanagement/FaultManagementAPI').default} faults
 * @property {import('./src/api/forms/FormsAPI').default} forms
 * @property {import('./src/api/Branding').default} branding
 * @property {import('./src/api/annotation/AnnotationAPI').default} annotation
 * @property {{(plugin: OpenMCTPlugin) => void}} install
 * @property {{() => string}} getAssetPath
 * @property {{(domElement: HTMLElement, isHeadlessMode: boolean) => void}} start
 * @property {{() => void}} startHeadless
 * @property {{() => void}} destroy
 * @property {OpenMCTPlugin[]} plugins
 * @property {OpenMCTComponent[]} components
 */

const MCT = require('./src/MCT');

/** @type {OpenMCT} */
const openmct = new MCT();

module.exports = openmct;
