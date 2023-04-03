/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

function updateLatestTimeStamp(timestamp, timeSystems) {
    let latest = {};

    timeSystems.forEach(timeSystem => {
        latest[timeSystem.key] = timestamp[timeSystem.key];
    });

    return latest;
}

export function getLatestTimestamp(
    currentTimestamp,
    compareTimestamp,
    timeSystems,
    currentTimeSystem
) {
    let latest = { ...currentTimestamp };
    const compare = { ...compareTimestamp };
    const key = currentTimeSystem.key;

    if (!latest || !latest[key]) {
        latest = updateLatestTimeStamp(compare, timeSystems);
    }

    if (compare[key] > latest[key]) {
        latest = updateLatestTimeStamp(compare, timeSystems);
    }

    return latest;
}

export function checkIfOld(callback, timeout) {
    let oldCheckTimer = setTimeout(() => {
        clearTimeout(oldCheckTimer);
        callback();
    }, timeout);

    return {
        update: (data) => {
            if (oldCheckTimer) {
                clearTimeout(oldCheckTimer);
            }

            oldCheckTimer = setTimeout(() => {
                clearTimeout(oldCheckTimer);
                callback(data);
            }, timeout);
        },
        clear: () => {
            if (oldCheckTimer) {
                clearTimeout(oldCheckTimer);
            }
        }
    };
}
