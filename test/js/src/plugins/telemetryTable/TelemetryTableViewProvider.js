/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import TelemetryTableView from './TelemetryTableView';

export default function TelemetryTableViewProvider(openmct) {
    function hasTelemetry(domainObject) {
        if (!Object.prototype.hasOwnProperty.call(domainObject, 'telemetry')) {
            return false;
        }

        let metadata = openmct.telemetry.getMetadata(domainObject);

        return metadata.values().length > 0;
    }

    return {
        key: 'table',
        name: 'Telemetry Table',
        cssClass: 'icon-tabular-scrolling',
        canView(domainObject) {
            return domainObject.type === 'table'
                || hasTelemetry(domainObject);
        },
        canEdit(domainObject) {
            return domainObject.type === 'table';
        },
        view(domainObject, objectPath) {
            return new TelemetryTableView(openmct, domainObject, objectPath);
        },
        priority() {
            return 1;
        }
    };
}
