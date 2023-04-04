/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

describe("the plugin", () => {
    let openmct;
    let viewDatumAction;
    let mockObjectPath;
    let mockView;
    let mockDatum;

    beforeEach((done) => {
        openmct = createOpenMct();

        openmct.on('start', done);
        openmct.startHeadless();

        viewDatumAction = openmct.actions._allActions.viewDatumAction;

        mockObjectPath = [{
            name: 'mock object',
            type: 'telemetry-table',
            identifier: {
                key: 'mock-object',
                namespace: ''
            }
        }];

        mockDatum = {
            time: 123456789,
            sin: 0.4455512,
            cos: 0.4455512
        };

        mockView = {
            getViewContext: () => {
                return {
                    row: {
                        viewDatumAction: true,
                        getDatum: () => {
                            return mockDatum;
                        }
                    }
                };
            }
        };
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('installs the view datum action', () => {
        expect(viewDatumAction).toBeDefined();
    });

    describe('when invoked', () => {

        beforeEach(() => {
            openmct.overlays.overlay = function (options) {};

            spyOn(openmct.overlays, 'overlay');

            viewDatumAction.invoke(mockObjectPath, mockView);
        });

        it('creates an overlay', () => {
            expect(openmct.overlays.overlay).toHaveBeenCalled();
        });
    });
});
