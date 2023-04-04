/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import {
    createOpenMct,
    resetApplicationState,
    spyOnBuiltins
} from 'utils/testing';

describe("the plugin", () => {
    let openmct;
    let openInNewTabAction;
    let mockObjectPath;

    beforeEach((done) => {
        openmct = createOpenMct();

        openmct.on('start', done);
        openmct.startHeadless();

        openInNewTabAction = openmct.actions._allActions.newTab;
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('installs the open in new tab action', () => {
        expect(openInNewTabAction).toBeDefined();
    });

    describe('when invoked', () => {

        beforeEach(async () => {
            mockObjectPath = [{
                name: 'mock folder',
                type: 'folder',
                identifier: {
                    key: 'mock-folder',
                    namespace: ''
                }
            }];
            spyOn(openmct.objects, 'get').and.returnValue(Promise.resolve({
                identifier: {
                    namespace: '',
                    key: 'test'
                }
            }));
            spyOnBuiltins(['open']);
            await openInNewTabAction.invoke(mockObjectPath);
        });

        it('it opens in a new tab', () => {
            expect(window.open).toHaveBeenCalled();
        });
    });
});
