/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


function remoteClockRequestInterceptor(openmct, _remoteClockIdentifier, waitForBounds) {
    let remoteClockLoaded = false;

    return {
        appliesTo: () => {
            // Get the activeClock from the Global Time Context
            const { activeClock } = openmct.time;

            return activeClock?.key === 'remote-clock' && !remoteClockLoaded;
        },
        invoke: async (request) => {
            const { start, end } = await waitForBounds();
            remoteClockLoaded = true;
            request.start = start;
            request.end = end;

            return request;
        }
    };
}

export default remoteClockRequestInterceptor;
