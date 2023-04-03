/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import ImportFromJSONAction from './ImportFromJSONAction';

import {
    createOpenMct,
    resetApplicationState
} from 'utils/testing';

let openmct;
let importFromJSONAction;

describe("The import JSON action", function () {
    beforeEach((done) => {
        openmct = createOpenMct();

        openmct.on('start', done);
        openmct.startHeadless();

        importFromJSONAction = new ImportFromJSONAction(openmct);
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('has import as JSON action', () => {
        expect(importFromJSONAction.key).toBe('import.JSON');
    });

    it('applies to return true for objects with composition', function () {
        const domainObject = {
            composition: [],
            name: 'Unnamed Folder',
            type: 'folder',
            location: '9f6c9dae-51c3-401d-92f1-c812de942922',
            modified: 1637021471624,
            persisted: 1637021471624,
            id: '84438cda-a071-48d1-b9bf-d77bd53e59ba',
            identifier: {
                namespace: '',
                key: '84438cda-a071-48d1-b9bf-d77bd53e59ba'
            }
        };

        const objectPath = [
            domainObject
        ];

        spyOn(openmct.composition, 'get').and.returnValue(true);

        expect(importFromJSONAction.appliesTo(objectPath)).toBe(true);
    });

    it('applies to return false for objects without composition', function () {
        const domainObject = {
            telemetry: {
                period: 10,
                amplitude: 1,
                offset: 0,
                dataRateInHz: 1,
                phase: 0,
                randomness: 0
            },
            name: 'Unnamed Sine Wave Generator',
            type: 'generator',
            location: '84438cda-a071-48d1-b9bf-d77bd53e59ba',
            modified: 1637021471172,
            identifier: {
                namespace: '',
                key: 'c102b6e1-3c81-4618-926a-56cc310925f6'
            },
            persisted: 1637021471172
        };

        const objectPath = [
            domainObject
        ];

        spyOn(openmct.types, 'get').and.returnValue({});
        spyOn(openmct.composition, 'get').and.returnValue(false);

        expect(importFromJSONAction.appliesTo(objectPath)).toBe(false);
    });

    it('calls showForm on invoke ', function () {
        const domainObject = {
            composition: [],
            name: 'Unnamed Folder',
            type: 'folder',
            location: '9f6c9dae-51c3-401d-92f1-c812de942922',
            modified: 1637021471624,
            persisted: 1637021471624,
            id: '84438cda-a071-48d1-b9bf-d77bd53e59ba',
            identifier: {
                namespace: '',
                key: '84438cda-a071-48d1-b9bf-d77bd53e59ba'
            }
        };

        const objectPath = [
            domainObject
        ];

        spyOn(openmct.forms, 'showForm').and.returnValue(Promise.resolve({}));
        spyOn(importFromJSONAction, 'onSave').and.returnValue(Promise.resolve({}));
        importFromJSONAction.invoke(objectPath);

        expect(openmct.forms.showForm).toHaveBeenCalled();
    });
});
