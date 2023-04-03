/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import CreateAction from './CreateAction';

import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

import { debounce } from 'lodash';

let parentObject;
let parentObjectPath;
let unObserve;

describe("The create action plugin", () => {
    let openmct;

    const TYPES = [
        'clock',
        'conditionWidget',
        'conditionWidget',
        'example.imagery',
        'example.state-generator',
        'flexible-layout',
        'folder',
        'generator',
        'hyperlink',
        'LadTable',
        'LadTableSet',
        'layout',
        'mmgis',
        'notebook',
        'plan',
        'table',
        'tabs',
        'telemetry-mean',
        'telemetry.plot.bar-graph',
        'telemetry.plot.overlay',
        'telemetry.plot.stacked',
        'time-strip',
        'timer',
        'webpage'
    ];

    beforeEach((done) => {
        openmct = createOpenMct();

        openmct.on('start', done);
        openmct.startHeadless();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe('creates new objects for a', () => {
        beforeEach(() => {
            parentObject = {
                name: 'mock folder',
                type: 'folder',
                identifier: {
                    key: 'mock-folder',
                    namespace: ''
                },
                composition: []
            };
            parentObjectPath = [parentObject];

            spyOn(openmct.objects, 'save');
            openmct.objects.save.and.callThrough();
            spyOn(openmct.forms, 'showForm');
            openmct.forms.showForm.and.callFake(formStructure => {
                return Promise.resolve({
                    name: 'test',
                    notes: 'test notes',
                    location: parentObjectPath
                });
            });
        });

        afterEach(() => {
            parentObject = null;
            unObserve();
        });

        TYPES.forEach(type => {
            it(`type ${type}`, (done) => {
                function callback(newObject) {
                    const composition = newObject.composition;

                    openmct.objects.get(composition[0])
                        .then(object => {
                            expect(object.type).toEqual(type);
                            expect(object.location).toEqual(openmct.objects.makeKeyString(parentObject.identifier));

                            done();
                        });
                }

                const deBouncedCallback = debounce(callback, 300);
                unObserve = openmct.objects.observe(parentObject, '*', deBouncedCallback);

                const createAction = new CreateAction(openmct, type, parentObject);
                createAction.invoke();
            });
        });
    });
});
