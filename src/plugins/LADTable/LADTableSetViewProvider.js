/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import LadTableSetView from './LadTableSetView';

export default function LADTableSetViewProvider(openmct) {
    return {
        key: 'LadTableSet',
        name: 'LAD Table Set',
        cssClass: 'icon-tabular-lad-set',
        canView: function (domainObject) {
            return domainObject.type === 'LadTableSet';
        },
        canEdit: function (domainObject) {
            return domainObject.type === 'LadTableSet';
        },
        view: function (domainObject, objectPath) {
            return new LadTableSetView(openmct, domainObject, objectPath);
        },
        priority: function () {
            return 1;
        }
    };
}
