/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import StaticModelProvider from './StaticModelProvider';

export default function StaticRootPlugin(options) {
    const rootIdentifier = {
        namespace: options.namespace,
        key: 'root'
    };

    let cachedProvider;

    function loadProvider() {
        return fetch(options.exportUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (importData) {
                cachedProvider = new StaticModelProvider(importData, rootIdentifier);

                return cachedProvider;
            });
    }

    function getProvider() {
        if (!cachedProvider) {
            cachedProvider = loadProvider();
        }

        return Promise.resolve(cachedProvider);
    }

    return function install(openmct) {
        openmct.objects.addRoot(rootIdentifier);
        openmct.objects.addProvider(options.namespace, {
            get: function (identifier) {
                return getProvider().then(function (provider) {
                    return provider.get(identifier);
                });
            }
        });
    };
}
