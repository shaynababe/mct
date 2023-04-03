/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import {
    createOpenMct, resetApplicationState
} from '../utils/testing';

describe('The Editor API', () => {
    let openmct;

    beforeEach((done) => {
        openmct = createOpenMct();
        openmct.on('start', done);

        spyOn(openmct.objects, 'endTransaction');

        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('opens a transaction on edit', () => {
        expect(
            openmct.objects.isTransactionActive()
        ).toBeFalse();
        openmct.editor.edit();
        expect(
            openmct.objects.isTransactionActive()
        ).toBeTrue();
    });

    it('closes an open transaction on successful save', async () => {
        spyOn(openmct.objects, 'getActiveTransaction')
            .and.returnValue({
                commit: () => Promise.resolve(true)
            });

        openmct.editor.edit();
        await openmct.editor.save();

        expect(
            openmct.objects.endTransaction
        ).toHaveBeenCalled();
    });

    it('does not close an open transaction on failed save', async () => {
        spyOn(openmct.objects, 'getActiveTransaction')
            .and.returnValue({
                commit: () => Promise.reject()
            });

        openmct.editor.edit();
        await openmct.editor.save().catch(() => {});

        expect(
            openmct.objects.endTransaction
        ).not.toHaveBeenCalled();
    });
});
