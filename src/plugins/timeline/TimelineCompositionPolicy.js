/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

const ALLOWED_TYPES = [
    'telemetry.plot.overlay',
    'telemetry.plot.stacked',
    'plan',
    'gantt-chart'
];
const DISALLOWED_TYPES = [
    'telemetry.plot.bar-graph',
    'telemetry.plot.scatter-plot'
];
export default function TimelineCompositionPolicy(openmct) {
    function hasNumericTelemetry(domainObject, metadata) {
        const hasTelemetry = openmct.telemetry.isTelemetryObject(domainObject);
        if (!hasTelemetry || !metadata) {
            return false;
        }

        return metadata.values().length > 0 && hasDomainAndRange(metadata);
    }

    function hasDomainAndRange(metadata) {
        return (metadata.valuesForHints(['range']).length > 0
            && metadata.valuesForHints(['domain']).length > 0);
    }

    function hasImageTelemetry(domainObject, metadata) {
        if (!metadata) {
            return false;
        }

        return metadata.valuesForHints(['image']).length > 0;
    }

    return {
        allow: function (parent, child) {
            if (parent.type === 'time-strip') {
                const metadata = openmct.telemetry.getMetadata(child);

                if (!DISALLOWED_TYPES.includes(child.type)
                    && (hasNumericTelemetry(child, metadata) || hasImageTelemetry(child, metadata) || ALLOWED_TYPES.includes(child.type))) {
                    return true;
                }

                return false;
            }

            return true;
        }
    };
}
