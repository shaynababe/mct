/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import {
    createOpenMct,
    resetApplicationState
} from '../../src/utils/testing';
import ExampleUserProvider from './ExampleUserProvider';

describe("The Example User Plugin", () => {
    let openmct;

    beforeEach(() => {
        openmct = createOpenMct();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('is not installed by default', () => {
        expect(openmct.user.hasProvider()).toBeFalse();
    });

    it('can be installed', () => {
        openmct.user.on('providerAdded', (provider) => {
            expect(provider).toBeInstanceOf(ExampleUserProvider);
        });
        openmct.install(openmct.plugins.example.ExampleUser());
    });
});
