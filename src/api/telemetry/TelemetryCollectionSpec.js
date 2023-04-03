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
} from 'utils/testing';
import { TIMESYSTEM_KEY_WARNING } from './constants';

describe('Telemetry Collection', () => {
    let openmct;
    let mockMetadataProvider;
    let mockMetadata = {};
    let domainObject;

    beforeEach(done => {
        openmct = createOpenMct();
        openmct.on('start', done);

        domainObject = {
            identifier: {
                key: 'a',
                namespace: 'b'
            },
            type: 'sample-type'
        };

        mockMetadataProvider = {
            key: 'mockMetadataProvider',
            supportsMetadata() {
                return true;
            },
            getMetadata() {
                return mockMetadata;
            }
        };

        openmct.telemetry.addProvider(mockMetadataProvider);
        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState();
    });

    it('Warns if telemetry metadata does not match the active timesystem', () => {
        mockMetadata.values = [
            {
                key: 'foo',
                name: 'Bar',
                hints: {
                    domain: 1
                }
            }
        ];

        const telemetryCollection = openmct.telemetry.requestCollection(domainObject);
        spyOn(telemetryCollection, '_warn');
        telemetryCollection.load();

        expect(telemetryCollection._warn).toHaveBeenCalledOnceWith(TIMESYSTEM_KEY_WARNING);
    });

    it('Does not warn if telemetry metadata matches the active timesystem', () => {
        mockMetadata.values = [
            {
                key: 'utc',
                name: 'Timestamp',
                format: 'utc',
                hints: {
                    domain: 1
                }
            }
        ];

        const telemetryCollection = openmct.telemetry.requestCollection(domainObject);
        spyOn(telemetryCollection, '_warn');
        telemetryCollection.load();

        expect(telemetryCollection._warn).not.toHaveBeenCalled();
    });
});
