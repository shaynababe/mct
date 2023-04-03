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
} from '../../utils/testing';
import {
    FAULT_MANAGEMENT_TYPE,
    FAULT_MANAGEMENT_VIEW,
    FAULT_MANAGEMENT_NAMESPACE
} from './constants';

describe("The Fault Management Plugin", () => {
    let openmct;
    const faultDomainObject = {
        name: 'it is not your fault',
        type: FAULT_MANAGEMENT_TYPE,
        identifier: {
            key: 'nobodies',
            namespace: 'fault'
        }
    };

    beforeEach(() => {
        openmct = createOpenMct();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('is not installed by default', () => {
        const typeDef = openmct.types.get(FAULT_MANAGEMENT_TYPE).definition;

        expect(typeDef.name).toBe('Unknown Type');
    });

    it('can be installed', () => {
        openmct.install(openmct.plugins.FaultManagement());
        const typeDef = openmct.types.get(FAULT_MANAGEMENT_TYPE).definition;

        expect(typeDef.name).toBe('Fault Management');
    });

    describe('once it is installed', () => {
        beforeEach(() => {
            openmct.install(openmct.plugins.FaultManagement());
        });

        it('provides a view for fault management types', () => {
            const applicableViews = openmct.objectViews.get(faultDomainObject, []);
            const faultManagementView = applicableViews.find(
                (viewProvider) => viewProvider.key === FAULT_MANAGEMENT_VIEW
            );

            expect(applicableViews.length).toEqual(1);
            expect(faultManagementView).toBeDefined();
        });

        it('provides an inspector view for fault management types', () => {
            const faultDomainObjectSelection = [[
                {
                    context: {
                        item: faultDomainObject
                    }
                }
            ]];
            const applicableInspectorViews = openmct.inspectorViews.get(faultDomainObjectSelection);
            const faultManagementInspectorView = applicableInspectorViews.filter(view => view.name === 'Fault Management Configuration');

            expect(faultManagementInspectorView.length).toEqual(1);
        });

        it('creates a root object for fault management', async () => {
            const root = await openmct.objects.getRoot();
            const rootCompositionCollection = openmct.composition.get(root);
            const rootComposition = await rootCompositionCollection.load();
            const faultObject = rootComposition.find(obj => obj.identifier.namespace === FAULT_MANAGEMENT_NAMESPACE);

            expect(faultObject).toBeDefined();
        });

    });
});
