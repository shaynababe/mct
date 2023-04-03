/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class ISOTimeFormat {
    constructor() {
        this.key = 'iso';
    }

    format(value) {
        if (value !== undefined) {
            return new Date(value).toISOString();
        } else {
            return value;
        }
    }

    parse(text) {
        if (typeof text === 'number' || text === undefined) {
            return text;
        }

        return Date.parse(text);
    }

    validate(text) {
        return !isNaN(Date.parse(text));
    }
}
