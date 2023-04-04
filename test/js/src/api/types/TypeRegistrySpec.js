/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import TypeRegistry from './TypeRegistry';

describe('The Type API', function () {
    let typeRegistryInstance;

    beforeEach(function () {
        typeRegistryInstance = new TypeRegistry ();
        typeRegistryInstance.addType('testType', {
            name: 'Test Type',
            description: 'This is a test type.',
            creatable: true
        });
    });

    it('types can be standardized', function () {
        typeRegistryInstance.addType('standardizationTestType', {
            label: 'Test Type',
            description: 'This is a test type.',
            creatable: true
        });
        typeRegistryInstance.standardizeType(typeRegistryInstance.types.standardizationTestType);
        expect(typeRegistryInstance.get('standardizationTestType').definition.label).toBeUndefined();
        expect(typeRegistryInstance.get('standardizationTestType').definition.name).toBe('Test Type');
    });

    it('new types are registered successfully and can be retrieved', function () {
        expect(typeRegistryInstance.get('testType').definition.name).toBe('Test Type');
    });

    it('type registry contains new keys', function () {
        expect(typeRegistryInstance.listKeys ()).toContain('testType');
    });
});
