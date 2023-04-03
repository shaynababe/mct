/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import ConditionManager from './ConditionManager';

describe('ConditionManager', () => {

    let conditionMgr;
    let mockListener;
    let openmct = {};
    let mockDefaultCondition = {
        isDefault: true,
        id: '1234-5678',
        configuration: {
            criteria: []
        }
    };
    let mockCondition1 = {
        id: '2345-6789',
        configuration: {
            criteria: []
        }
    };
    let updatedMockCondition1 = {
        id: '2345-6789',
        configuration: {
            trigger: 'xor',
            criteria: []
        }
    };
    let mockCondition2 = {
        id: '3456-7890',
        configuration: {
            criteria: []
        }
    };
    let conditionSetDomainObject = {
        identifier: {
            namespace: "",
            key: "600a7372-8d48-4dc4-98b6-548611b1ff7e"
        },
        type: "conditionSet",
        location: "mine",
        configuration: {
            conditionCollection: [
                mockCondition1,
                mockCondition2,
                mockDefaultCondition
            ]
        }
    };
    let mockComposition;
    let loader;
    let mockTimeSystems;

    function mockAngularComponents() {
        let mockInjector = jasmine.createSpyObj('$injector', ['get']);

        let mockInstantiate = jasmine.createSpy('mockInstantiate');
        mockInstantiate.and.returnValue(mockInstantiate);

        let mockDomainObject = {
            useCapability: function () {
                return mockDefaultCondition;
            }
        };
        mockInstantiate.and.callFake(function () {
            return mockDomainObject;
        });
        mockInjector.get.and.callFake(function (service) {
            return {
                'instantiate': mockInstantiate
            }[service];
        });

        openmct.$injector = mockInjector;
    }

    beforeEach(function () {

        mockAngularComponents();
        mockListener = jasmine.createSpy('mockListener');
        loader = {};
        loader.promise = new Promise(function (resolve, reject) {
            loader.resolve = resolve;
            loader.reject = reject;
        });

        mockComposition = jasmine.createSpyObj('compositionCollection', [
            'load',
            'on',
            'off'
        ]);
        mockComposition.load.and.callFake(() => {
            setTimeout(() => {
                loader.resolve();
            });

            return loader.promise;
        });
        mockComposition.on('add', mockListener);
        mockComposition.on('remove', mockListener);
        openmct.composition = jasmine.createSpyObj('compositionAPI', [
            'get'
        ]);
        openmct.composition.get.and.returnValue(mockComposition);

        openmct.objects = jasmine.createSpyObj('objects', ['get', 'makeKeyString', 'observe', 'mutate']);
        openmct.objects.get.and.returnValues(new Promise(function (resolve, reject) {
            resolve(conditionSetDomainObject);
        }), new Promise(function (resolve, reject) {
            resolve(mockCondition1);
        }), new Promise(function (resolve, reject) {
            resolve(mockCondition2);
        }), new Promise(function (resolve, reject) {
            resolve(mockDefaultCondition);
        }));
        openmct.objects.makeKeyString.and.returnValue(conditionSetDomainObject.identifier.key);
        openmct.objects.observe.and.returnValue(function () {});
        openmct.objects.mutate.and.returnValue(function () {});

        mockTimeSystems = {
            key: 'utc'
        };
        openmct.time = jasmine.createSpyObj('time', ['getAllTimeSystems']);
        openmct.time.getAllTimeSystems.and.returnValue([mockTimeSystems]);

        conditionMgr = new ConditionManager(conditionSetDomainObject, openmct);

        conditionMgr.on('conditionSetResultUpdated', mockListener);
        conditionMgr.on('telemetryReceived', mockListener);
    });

    it('creates a conditionCollection with a default condition', function () {
        expect(conditionMgr.conditionSetDomainObject.configuration.conditionCollection.length).toEqual(3);
        let defaultConditionId = conditionMgr.conditions[2].id;
        expect(defaultConditionId).toEqual(mockDefaultCondition.id);
    });

    it('reorders a conditionCollection', function () {
        let reorderPlan = [{
            oldIndex: 1,
            newIndex: 0
        },
        {
            oldIndex: 0,
            newIndex: 1
        },
        {
            oldIndex: 2,
            newIndex: 2
        }];
        conditionMgr.reorderConditions(reorderPlan);
        expect(conditionMgr.conditionSetDomainObject.configuration.conditionCollection.length).toEqual(3);
        expect(conditionMgr.conditionSetDomainObject.configuration.conditionCollection[0].id).toEqual(mockCondition2.id);
        expect(conditionMgr.conditionSetDomainObject.configuration.conditionCollection[1].id).toEqual(mockCondition1.id);
    });

    it('updates the right condition after reorder', function () {
        let reorderPlan = [{
            oldIndex: 1,
            newIndex: 0
        },
        {
            oldIndex: 0,
            newIndex: 1
        },
        {
            oldIndex: 2,
            newIndex: 2
        }];
        conditionMgr.reorderConditions(reorderPlan);
        conditionMgr.updateCondition(updatedMockCondition1);
        expect(conditionMgr.conditions[1].trigger).toEqual(updatedMockCondition1.configuration.trigger);
    });

    it('removes the right condition after reorder', function () {
        let reorderPlan = [{
            oldIndex: 1,
            newIndex: 0
        },
        {
            oldIndex: 0,
            newIndex: 1
        },
        {
            oldIndex: 2,
            newIndex: 2
        }];
        conditionMgr.reorderConditions(reorderPlan);
        conditionMgr.removeCondition(mockCondition1.id);
        expect(conditionMgr.conditions.length).toEqual(2);
        expect(conditionMgr.conditionSetDomainObject.configuration.conditionCollection[0].id).toEqual(mockCondition2.id);
    });

});
