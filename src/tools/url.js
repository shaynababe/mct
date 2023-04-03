/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
 * Module defining url handling.
 */

function getUrlParams(openmct, customUrlParams = {}) {
    let urlParams = openmct.router.getParams();
    Object.entries(customUrlParams).forEach((urlParam) => {
        const [key, value] = urlParam;
        urlParams[key] = value;
    });

    if (urlParams['tc.mode'] === 'fixed') {
        delete urlParams['tc.startDelta'];
        delete urlParams['tc.endDelta'];
    } else if (urlParams['tc.mode'] === 'local') {
        delete urlParams['tc.startBound'];
        delete urlParams['tc.endBound'];
    }

    return urlParams;
}

export function paramsToArray(openmct, customUrlParams = {}) {
    // parse urlParams from an object to an array.
    let urlParams = getUrlParams(openmct, customUrlParams);
    let newTabParams = [];
    for (let key in urlParams) {
        if ({}.hasOwnProperty.call(urlParams, key)) {
            let param = `${key}=${urlParams[key]}`;
            newTabParams.push(param);
        }
    }

    return newTabParams;
}

export function identifierToString(openmct, objectPath) {
    return '#/browse/' + openmct.objects.getRelativePath(objectPath);
}

/**
 * @param {import('../../openmct').OpenMCT} openmct
 * @param {Array<import('../api/objects/ObjectAPI').DomainObject>} objectPath
 * @param {any} customUrlParams
 * @returns {string} url
 */
export default function objectPathToUrl(openmct, objectPath, customUrlParams = {}) {
    let url = identifierToString(openmct, objectPath);

    let urlParams = paramsToArray(openmct, customUrlParams);
    if (urlParams.length) {
        url += '?' + urlParams.join('&');
    }

    return url;
}
