/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import moment from 'moment';

export default function multiFormat(date) {
    const momentified = moment.utc(date);
    /**
     * Uses logic from d3 Time-Scales, v3 of the API. See
     * https://github.com/d3/d3-3.x-api-reference/blob/master/Time-Scales.md
     *
     * Licensed
     */
    const format = [
        [".SSS", function (m) {
            return m.milliseconds();
        }],
        [":ss", function (m) {
            return m.seconds();
        }],
        ["HH:mm", function (m) {
            return m.minutes();
        }],
        ["HH:mm", function (m) {
            return m.hours();
        }],
        ["ddd DD", function (m) {
            return m.days()
                && m.date() !== 1;
        }],
        ["MMM DD", function (m) {
            return m.date() !== 1;
        }],
        ["MMMM", function (m) {
            return m.month();
        }],
        ["YYYY", function () {
            return true;
        }]
    ].filter(function (row) {
        return row[1](momentified);
    })[0][0];

    if (format !== undefined) {
        return moment.utc(date).format(format);
    }
}
