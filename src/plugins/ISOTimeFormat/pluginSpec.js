/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import ISOTimeFormat from './ISOTimeFormat.js';

describe("the plugin", () => {
    const ISO_KEY = 'iso';
    const JUNK = "junk";
    const MOON_LANDING_TIMESTAMP = -14256000000;
    const MOON_LANDING_DATESTRING = '1969-07-20T00:00:00.000Z';
    let isoFormatter;

    beforeEach(() => {
        isoFormatter = new ISOTimeFormat();
    });

    describe("creates a new ISO based formatter", function () {

        it("with the key 'iso'", () => {
            expect(isoFormatter.key).toBe(ISO_KEY);
        });

        it("that will format a timestamp in ISO standard format", () => {
            expect(isoFormatter.format(MOON_LANDING_TIMESTAMP)).toBe(MOON_LANDING_DATESTRING);
        });

        it("that will parse an ISO Date String into milliseconds", () => {
            expect(isoFormatter.parse(MOON_LANDING_DATESTRING)).toBe(MOON_LANDING_TIMESTAMP);
        });

        it("that will validate correctly", () => {
            expect(isoFormatter.validate(MOON_LANDING_DATESTRING)).toBe(true);
            expect(isoFormatter.validate(JUNK)).toBe(false);
        });
    });
});
