/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

class RootObjectProvider {
    constructor(rootRegistry) {
        if (!RootObjectProvider.instance) {
            this.rootRegistry = rootRegistry;
            this.rootObject = {
                identifier: {
                    key: "ROOT",
                    namespace: ""
                },
                name: 'Open MCT',
                type: 'root',
                composition: []
            };
            RootObjectProvider.instance = this;
        } else if (rootRegistry) {
            // if called twice, update instance rootRegistry
            RootObjectProvider.instance.rootRegistry = rootRegistry;
        }

        return RootObjectProvider.instance; // eslint-disable-line no-constructor-return
    }

    updateName(name) {
        this.rootObject.name = name;
    }

    async get() {
        let roots = await this.rootRegistry.getRoots();
        this.rootObject.composition = roots;

        return this.rootObject;
    }
}

function instance(rootRegistry) {
    return new RootObjectProvider(rootRegistry);
}

export default instance;
