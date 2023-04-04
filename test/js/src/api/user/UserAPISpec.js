/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import {
    createOpenMct,
    resetApplicationState
} from '../../utils/testing';
import {
    MULTIPLE_PROVIDER_ERROR
} from './constants';
import ExampleUserProvider from '../../../example/exampleUser/ExampleUserProvider';

const USERNAME = 'Test User';
const EXAMPLE_ROLE = 'example-role';

describe("The User API", () => {
    let openmct;

    beforeEach(() => {
        openmct = createOpenMct();
    });

    afterEach(() => {
        const activeOverlays = openmct.overlays.activeOverlays;
        activeOverlays.forEach(overlay => overlay.dismiss());

        return resetApplicationState(openmct);
    });

    describe('with regard to user providers', () => {
        it('allows you to specify a user provider', () => {
            openmct.user.on('providerAdded', (provider) => {
                expect(provider).toBeInstanceOf(ExampleUserProvider);
            });
            openmct.user.setProvider(new ExampleUserProvider(openmct));
        });

        it('prevents more than one user provider from being set', () => {
            openmct.user.setProvider(new ExampleUserProvider(openmct));

            expect(() => {
                openmct.user.setProvider({});
            }).toThrow(new Error(MULTIPLE_PROVIDER_ERROR));
        });

        it('provides a check for an existing user provider', () => {
            expect(openmct.user.hasProvider()).toBeFalse();

            openmct.user.setProvider(new ExampleUserProvider(openmct));

            expect(openmct.user.hasProvider()).toBeTrue();
        });
    });

    describe('provides the ability', () => {
        let provider;

        beforeEach(() => {
            provider = new ExampleUserProvider(openmct);
            provider.autoLogin(USERNAME);
        });

        it('to check if a user (not specific) is loged in', (done) => {
            expect(openmct.user.isLoggedIn()).toBeFalse();

            openmct.user.on('providerAdded', () => {
                expect(openmct.user.isLoggedIn()).toBeTrue();
                done();
            });

            // this will trigger the user indicator plugin,
            // which will in turn login the user
            openmct.user.setProvider(provider);
        });

        it('to get the current user', (done) => {
            openmct.user.setProvider(provider);
            openmct.user.getCurrentUser().then((apiUser) => {
                expect(apiUser.name).toEqual(USERNAME);
            }).finally(done);
        });

        it('to check if a user has a specific role (by id)', (done) => {
            openmct.user.setProvider(provider);
            let junkIdCheckPromise = openmct.user.hasRole('junk-id').then((hasRole) => {
                expect(hasRole).toBeFalse();
            });
            let realIdCheckPromise = openmct.user.hasRole(EXAMPLE_ROLE).then((hasRole) => {
                expect(hasRole).toBeTrue();
            });

            Promise.all([junkIdCheckPromise, realIdCheckPromise]).finally(done);
        });
    });
});
