/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { createOpenMct, resetApplicationState } from "utils/testing";
import InterceptorPlugin from "./plugin";

describe('the plugin', function () {
    let element;
    let child;
    let openmct;
    const TEST_NAMESPACE = 'test';

    beforeEach((done) => {
        openmct = createOpenMct();
        openmct.install(new InterceptorPlugin(openmct));

        element = document.createElement('div');
        element.style.width = '640px';
        element.style.height = '480px';
        child = document.createElement('div');
        child.style.width = '640px';
        child.style.height = '480px';
        element.appendChild(child);

        openmct.on('start', done);
        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe('the missingObjectInterceptor', () => {
        let mockProvider;

        beforeEach(() => {
            mockProvider = jasmine.createSpyObj("mock provider", [
                "get"
            ]);
            mockProvider.get.and.returnValue(Promise.resolve(undefined));
            openmct.objects.addProvider(TEST_NAMESPACE, mockProvider);
        });

        it('returns missing objects', () => {
            const identifier = {
                namespace: TEST_NAMESPACE,
                key: 'hello'
            };

            return openmct.objects.get(identifier).then((testObject) => {
                expect(testObject).toEqual({
                    identifier,
                    type: 'unknown',
                    name: 'Missing: test:hello'
                });
            });
        });

    });
});
