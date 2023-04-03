/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*
This test suite is dedicated to testing our use of our custom fixtures to verify
that they are working as expected.
*/

const { test } = require('../../pluginFixtures.js');

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip('pluginFixtures tests', () => {
    // test.use({ domainObjectName: 'Timer' });
    // let timerUUID;

    // test('Creates a timer object @framework @unstable', ({ domainObject }) => {
    //     const { uuid } = domainObject;
    //     const uuidRegexp = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/;
    //     expect(uuid).toMatch(uuidRegexp);
    //     timerUUID = uuid;
    // });

    // test('Provides same uuid for subsequent uses of the same object @framework', ({ domainObject }) => {
    //     const { uuid } = domainObject;
    //     expect(uuid).toEqual(timerUUID);
    // });
});
