/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    './EvaluatorPool',
    './SummaryWidgetEvaluator'
], function (
    EvaluatorPool,
    SummaryWidgetEvaluator
) {
    describe('EvaluatorPool', function () {
        let pool;
        let openmct;
        let objectA;
        let objectB;

        beforeEach(function () {
            openmct = {
                composition: jasmine.createSpyObj('compositionAPI', ['get']),
                objects: jasmine.createSpyObj('objectAPI', ['observe'])
            };
            openmct.composition.get.and.callFake(function () {
                const compositionCollection = jasmine.createSpyObj(
                    'compositionCollection',
                    [
                        'load',
                        'on',
                        'off'
                    ]
                );
                compositionCollection.load.and.returnValue(Promise.resolve());

                return compositionCollection;
            });
            openmct.objects.observe.and.callFake(function () {
                return function () {};
            });
            pool = new EvaluatorPool(openmct);
            objectA = {
                identifier: {
                    namespace: 'someNamespace',
                    key: 'someKey'
                },
                configuration: {
                    ruleOrder: []
                }
            };
            objectB = {
                identifier: {
                    namespace: 'otherNamespace',
                    key: 'otherKey'
                },
                configuration: {
                    ruleOrder: []
                }
            };
        });

        it('returns new evaluators for different objects', function () {
            const evaluatorA = pool.get(objectA);
            const evaluatorB = pool.get(objectB);
            expect(evaluatorA).not.toBe(evaluatorB);
        });

        it('returns the same evaluator for the same object', function () {
            const evaluatorA = pool.get(objectA);
            const evaluatorB = pool.get(objectA);
            expect(evaluatorA).toBe(evaluatorB);

            const evaluatorC = pool.get(JSON.parse(JSON.stringify(objectA)));
            expect(evaluatorA).toBe(evaluatorC);
        });

        it('returns new evaluator when old is released', function () {
            const evaluatorA = pool.get(objectA);
            const evaluatorB = pool.get(objectA);
            expect(evaluatorA).toBe(evaluatorB);
            pool.release(evaluatorA);
            pool.release(evaluatorB);
            const evaluatorC = pool.get(objectA);
            expect(evaluatorA).not.toBe(evaluatorC);
        });
    });
});
