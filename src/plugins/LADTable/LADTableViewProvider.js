/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import LADTableView from './LADTableView';

export default class LADTableViewProvider {
    constructor(openmct) {
        this.openmct = openmct;
        this.name = 'LAD Table';
        this.key = 'LadTable';
        this.cssClass = 'icon-tabular-lad';
    }

    canView(domainObject) {
        const supportsComposition = this.openmct.composition.supportsComposition(domainObject);
        const providesTelemetry = this.openmct.telemetry.isTelemetryObject(domainObject);
        const isLadTable = domainObject.type === 'LadTable';
        const isConditionSet = domainObject.type === 'conditionSet';

        return !isConditionSet
            && (isLadTable
            || (providesTelemetry && supportsComposition));
    }

    canEdit(domainObject) {
        return domainObject.type === 'LadTable';
    }

    view(domainObject, objectPath) {
        return new LADTableView(this.openmct, domainObject, objectPath);
    }

    priority(domainObject) {
        return this.openmct.priority.HIGH;
    }
}
