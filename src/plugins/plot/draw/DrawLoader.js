/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import DrawWebGL from './DrawWebGL';
import Draw2D from './Draw2D';

const CHARTS = [
    {
        MAX_INSTANCES: 16,
        API: DrawWebGL,
        ALLOCATIONS: []
    },
    {
        MAX_INSTANCES: Number.POSITIVE_INFINITY,
        API: Draw2D,
        ALLOCATIONS: []
    }
];
/**
         * Draw loader attaches a draw API to a canvas element and returns the
         * draw API.
         */

export const DrawLoader = {
    /**
     * Return the first draw API available.  Returns
     * `undefined` if a draw API could not be constructed.
     *.
     * @param {CanvasElement} canvas - The canvas eelement to attach
     the draw API to.
     */
    getDrawAPI: function (canvas, overlay) {
        let api;

        CHARTS.forEach(function (CHART_TYPE) {
            if (api) {
                return;
            }

            if (CHART_TYPE.ALLOCATIONS.length
                    >= CHART_TYPE.MAX_INSTANCES) {
                return;
            }

            try {
                api = new CHART_TYPE.API(canvas, overlay);
                CHART_TYPE.ALLOCATIONS.push(api);
            } catch (e) {
                console.warn([
                    "Could not instantiate chart",
                    CHART_TYPE.API.name,
                    ";",
                    e.message
                ].join(" "));
            }
        });

        if (!api) {
            console.warn("Cannot initialize mct-chart.");
        }

        return api;
    },
    /**
     * Returns a fallback draw api.
     */
    getFallbackDrawAPI: function (canvas, overlay) {
        const api = new CHARTS[1].API(canvas, overlay);
        CHARTS[1].ALLOCATIONS.push(api);

        return api;
    },
    releaseDrawAPI: function (api) {
        CHARTS.forEach(function (CHART_TYPE) {
            if (api instanceof CHART_TYPE.API) {
                CHART_TYPE.ALLOCATIONS.splice(CHART_TYPE.ALLOCATIONS.indexOf(api), 1);
            }
        });
        if (api.destroy) {
            api.destroy();
        }
    }
};
