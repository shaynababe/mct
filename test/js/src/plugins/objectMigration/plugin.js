/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import Migrations from './Migrations.js';

export default function () {
    return function (openmct) {
        let migrations = Migrations(openmct);

        function needsMigration(domainObject) {
            return migrations.some(m => m.check(domainObject));
        }

        function migrateObject(domainObject) {
            return migrations.filter(m => m.check(domainObject))[0]
                .migrate(domainObject);
        }

        let wrappedFunction = openmct.objects.get;
        openmct.objects.get = function migrate() {
            return wrappedFunction.apply(openmct.objects, [...arguments])
                .then(function (object) {
                    if (needsMigration(object)) {
                        migrateObject(object)
                            .then(newObject => {
                                openmct.objects.mutate(newObject, 'persisted', Date.now());

                                return newObject;
                            });
                    }

                    return object;
                });
        };
    };
}
