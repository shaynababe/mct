/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import moment from 'moment';

/**
 * Formatter for UTC timestamps. Interprets numeric values as
 * milliseconds since the start of 1970.
 *
 * @implements {Format}
 * @constructor
 * @memberof platform/commonUI/formats
 */
export default class UTCTimeFormat {
    constructor() {
        this.key = 'utc';
        this.DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
        this.DATE_FORMATS = {
            PRECISION_DEFAULT: this.DATE_FORMAT,
            PRECISION_DEFAULT_WITH_ZULU: this.DATE_FORMAT + 'Z',
            PRECISION_SECONDS: 'YYYY-MM-DD HH:mm:ss',
            PRECISION_MINUTES: 'YYYY-MM-DD HH:mm',
            PRECISION_DAYS: 'YYYY-MM-DD'
        };
    }

    /**
     * @param {string} formatString
     * @returns the value of formatString if the value is a string type and exists in the DATE_FORMATS array; otherwise the DATE_FORMAT value.
     */
    isValidFormatString(formatString) {
        return Object.values(this.DATE_FORMATS).includes(formatString);
    }

    /**
     * @param {number} value The value to format.
     * @returns {string} the formatted date(s). If multiple values were requested, then an array of
     * formatted values will be returned. Where a value could not be formatted, `undefined` will be returned at its position
     * in the array.
     */
    format(value, formatString) {
        if (value !== undefined) {
            const utc = moment.utc(value);

            if (formatString !== undefined && !this.isValidFormatString(formatString)) {
                throw "Invalid format requested from UTC Time Formatter ";
            }

            let format = formatString || this.DATE_FORMATS.PRECISION_DEFAULT;

            return utc.format(format) + (formatString ? '' : 'Z');
        } else {
            return value;
        }
    }

    parse(text) {
        if (typeof text === 'number') {
            return text;
        }

        return moment.utc(text, Object.values(this.DATE_FORMATS)).valueOf();
    }

    validate(text) {
        return moment.utc(text, Object.values(this.DATE_FORMATS), true).isValid();
    }

}
