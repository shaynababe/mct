/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import { TRIGGER } from "./constants";

export function evaluateResults(results, trigger) {
    if (trigger && trigger === TRIGGER.XOR) {
        return matchExact(results, 1);
    } else if (trigger && trigger === TRIGGER.NOT) {
        return matchExact(results, 0);
    } else if (trigger && trigger === TRIGGER.ALL) {
        return matchAll(results);
    } else {
        return matchAny(results);
    }
}

function matchAll(results) {
    for (let result of results) {
        if (result !== true) {
            return false;
        }
    }

    return true;
}

function matchAny(results) {
    for (let result of results) {
        if (result === true) {
            return true;
        }
    }

    return false;
}

function matchExact(results, target) {
    let matches = 0;
    for (let result of results) {
        if (result === true) {
            matches++;
        }

        if (matches > target) {
            return false;
        }
    }

    return matches === target;
}
