/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import {createOpenMct, resetApplicationState} from "utils/testing";
import CouchDBSearchFolderPlugin from './plugin';

describe('the plugin', function () {
    let identifier = {
        namespace: 'couch-search',
        key: "couch-search"
    };
    let testPath = '/test/db';
    let openmct;
    let composition;

    beforeEach(() => {

        openmct = createOpenMct();

        let couchPlugin = openmct.plugins.CouchDB(testPath);
        openmct.install(couchPlugin);

        openmct.install(new CouchDBSearchFolderPlugin('CouchDB Documents', couchPlugin, {
            "selector": {
                "model": {
                    "type": "plan"
                }
            }
        }));

        spyOn(couchPlugin.couchProvider, 'getObjectsByFilter').and.returnValue(Promise.resolve([
            {
                identifier: {
                    key: "1",
                    namespace: "mct"
                }
            },
            {
                identifier: {
                    key: "2",
                    namespace: "mct"
                }
            }
        ]));

        spyOn(couchPlugin.couchProvider, "get").and.callFake((id) => {
            return Promise.resolve({
                identifier: id
            });
        });

        return new Promise((resolve) => {
            openmct.once('start', resolve);
            openmct.startHeadless();
        }).then(() => {
            composition = openmct.composition.get({identifier});
        });
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    it('provides a folder to hold plans', () => {
        return openmct.objects.get(identifier).then((object) => {
            expect(object).toEqual({
                identifier,
                type: 'folder',
                name: 'CouchDB Documents',
                location: 'ROOT'
            });
        });
    });

    it('provides composition for couch search folders', () => {
        return composition.load().then((objects) => {
            expect(objects.length).toEqual(2);
        });
    });

});
