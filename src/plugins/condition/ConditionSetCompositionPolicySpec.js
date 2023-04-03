/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import ConditionSetCompositionPolicy from './ConditionSetCompositionPolicy';

describe('ConditionSetCompositionPolicy', () => {

    let policy;
    let testTelemetryObject;
    let openmct = {};
    let parentDomainObject;

    beforeAll(function () {
        testTelemetryObject = {
            identifier: {
                namespace: "",
                key: "test-object"
            },
            type: "test-object",
            name: "Test Object",
            telemetry: {
                values: [{
                    key: "some-key",
                    name: "Some attribute",
                    hints: {
                        domain: 1
                    }
                }, {
                    key: "some-other-key",
                    name: "Another attribute",
                    hints: {
                        range: 1
                    }
                }]
            }
        };
        openmct.objects = jasmine.createSpyObj('objects', ['get', 'makeKeyString']);
        openmct.objects.get.and.returnValue(testTelemetryObject);
        openmct.objects.makeKeyString.and.returnValue(testTelemetryObject.identifier.key);
        openmct.telemetry = jasmine.createSpyObj('telemetry', ['isTelemetryObject']);
        policy = new ConditionSetCompositionPolicy(openmct);
        parentDomainObject = {};
    });

    it('returns true for object types that are not conditionSets', function () {
        parentDomainObject.type = 'random';
        openmct.telemetry.isTelemetryObject.and.returnValue(false);
        expect(policy.allow(parentDomainObject, {})).toBe(true);
    });

    it('returns false for object types that are not telemetry objects when parent is a conditionSet', function () {
        parentDomainObject.type = 'conditionSet';
        openmct.telemetry.isTelemetryObject.and.returnValue(false);
        expect(policy.allow(parentDomainObject, {})).toBe(false);
    });

    it('returns true for object types that are telemetry objects when parent is a conditionSet', function () {
        parentDomainObject.type = 'conditionSet';
        openmct.telemetry.isTelemetryObject.and.returnValue(true);
        expect(policy.allow(parentDomainObject, testTelemetryObject)).toBe(true);
    });

    it('returns true for object types that are telemetry objects when parent is not a conditionSet', function () {
        parentDomainObject.type = 'random';
        openmct.telemetry.isTelemetryObject.and.returnValue(true);
        expect(policy.allow(parentDomainObject, testTelemetryObject)).toBe(true);
    });

});
