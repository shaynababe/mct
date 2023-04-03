/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export function getValidatedData(domainObject) {
    const sourceMap = domainObject.sourceMap;
    const body = domainObject.selectFile?.body;
    let json = {};
    if (typeof body === 'string') {
        try {
            json = JSON.parse(body);
        } catch (e) {
            return json;
        }
    } else if (body !== undefined) {
        json = body;
    }

    if (sourceMap !== undefined && sourceMap.activities !== undefined && sourceMap.groupId !== undefined) {
        let mappedJson = {};
        json[sourceMap.activities].forEach((activity) => {
            if (activity[sourceMap.groupId]) {
                const groupIdKey = activity[sourceMap.groupId];
                let groupActivity = {
                    ...activity
                };

                if (sourceMap.start) {
                    groupActivity.start = activity[sourceMap.start];
                }

                if (sourceMap.end) {
                    groupActivity.end = activity[sourceMap.end];
                }

                if (!mappedJson[groupIdKey]) {
                    mappedJson[groupIdKey] = [];
                }

                mappedJson[groupIdKey].push(groupActivity);
            }
        });

        return mappedJson;
    } else {
        return json;
    }
}

export function getContrastingColor(hexColor) {
    function cutHex(h, start, end) {
        const hStr = (h.charAt(0) === '#') ? h.substring(1, 7) : h;

        return parseInt(hStr.substring(start, end), 16);
    }

    // https://codepen.io/davidhalford/pen/ywEva/
    const cThreshold = 130;

    if (hexColor.indexOf('#') === -1) {
        // We weren't given a hex color
        return "#ff0000";
    }

    const hR = cutHex(hexColor, 0, 2);
    const hG = cutHex(hexColor, 2, 4);
    const hB = cutHex(hexColor, 4, 6);

    const cBrightness = ((hR * 299) + (hG * 587) + (hB * 114)) / 1000;

    return cBrightness > cThreshold ? "#000000" : "#ffffff";
}
