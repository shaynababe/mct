/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
export default function PerformanceIndicator() {
    return function install(openmct) {
        let frames = 0;
        let lastCalculated = performance.now();
        const indicator = openmct.indicators.simpleIndicator();

        indicator.text('~ fps');
        indicator.statusClass('s-status-info');
        openmct.indicators.add(indicator);

        let rafHandle = requestAnimationFrame(incremementFrames);

        openmct.on('destroy', () => {
            cancelAnimationFrame(rafHandle);
        });

        function incremementFrames() {
            let now = performance.now();
            if ((now - lastCalculated) < 1000) {
                frames++;
            } else {
                updateFPS(frames);
                lastCalculated = now;
                frames = 1;
            }

            rafHandle = requestAnimationFrame(incremementFrames);
        }

        function updateFPS(fps) {
            indicator.text(`${fps} fps`);
            if (fps >= 40) {
                indicator.statusClass('s-status-on');
            } else if (fps < 40 && fps >= 20) {
                indicator.statusClass('s-status-warning');
            } else {
                indicator.statusClass('s-status-error');
            }
        }
    };
}
