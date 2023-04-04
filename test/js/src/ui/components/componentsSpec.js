/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

describe('UI Components', () => {
    let openmct;

    beforeEach(done => {
        openmct = createOpenMct();
        openmct.on('start', done);
        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState();
    });

    it('are exposed to users', () => {
        expect(openmct.components).toBeDefined();
    });

    it('exposes the object view', () => {
        expect(openmct.components.ObjectView).toBeDefined();
    });
});
