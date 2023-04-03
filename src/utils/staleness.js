/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class StalenessUtils {
    constructor(openmct, domainObject) {
        this.openmct = openmct;
        this.domainObject = domainObject;
        this.metadata = this.openmct.telemetry.getMetadata(domainObject);
        this.lastStalenessResponseTime = 0;

        this.setTimeSystem(this.openmct.time.timeSystem());
        this.watchTimeSystem();
    }

    shouldUpdateStaleness(stalenessResponse, id) {
        const stalenessResponseTime = this.parseTime(stalenessResponse);

        if (stalenessResponseTime > this.lastStalenessResponseTime) {
            this.lastStalenessResponseTime = stalenessResponseTime;

            return true;
        } else {
            return false;
        }
    }

    watchTimeSystem() {
        this.openmct.time.on('timeSystem', this.setTimeSystem, this);
    }

    unwatchTimeSystem() {
        this.openmct.time.off('timeSystem', this.setTimeSystem, this);
    }

    setTimeSystem(timeSystem) {
        let metadataValue = { format: timeSystem.key };

        if (this.metadata) {
            metadataValue = this.metadata.value(timeSystem.key) ?? metadataValue;
        }

        const valueFormatter = this.openmct.telemetry.getValueFormatter(metadataValue);

        this.parseTime = (stalenessResponse) => {
            const stalenessDatum = {
                ...stalenessResponse,
                source: stalenessResponse[timeSystem.key]
            };

            return valueFormatter.parse(stalenessDatum);
        };
    }

    destroy() {
        this.unwatchTimeSystem();
    }
}
