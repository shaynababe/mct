/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import RootObjectProvider from '../RootObjectProvider';

describe('RootObjectProvider', function () {
    const ROOT_NAME = 'Open MCT';
    let rootObjectProvider;
    let roots = ['some root'];
    let rootRegistry = {
        getRoots: () => {
            return Promise.resolve(roots);
        }
    };

    beforeEach(function () {
        rootObjectProvider = new RootObjectProvider(rootRegistry);
    });

    it('supports fetching root', async () => {
        let root = await rootObjectProvider.get();

        expect(root).toEqual({
            identifier: {
                key: "ROOT",
                namespace: ""
            },
            name: ROOT_NAME,
            type: 'root',
            composition: ['some root']
        });
    });
});
