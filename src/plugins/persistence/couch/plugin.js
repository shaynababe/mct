/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import CouchObjectProvider from './CouchObjectProvider';
import CouchSearchProvider from './CouchSearchProvider';
import CouchStatusIndicator from './CouchStatusIndicator';

const NAMESPACE = '';
const LEGACY_SPACE = 'mct';
const COUCH_SEARCH_ONLY_NAMESPACE = `COUCH_SEARCH_${Date.now()}`;

export default function CouchPlugin(options) {
    return function install(openmct) {
        const simpleIndicator = openmct.indicators.simpleIndicator();
        openmct.indicators.add(simpleIndicator);
        const couchStatusIndicator = new CouchStatusIndicator(simpleIndicator);
        install.couchProvider = new CouchObjectProvider(openmct, options, NAMESPACE, couchStatusIndicator);

        // Unfortunately, for historical reasons, Couch DB produces objects with a mix of namepaces (alternately "mct", and "")
        // Installing the same provider under both namespaces means that it can respond to object gets for both namespaces.
        openmct.objects.addProvider(LEGACY_SPACE, install.couchProvider);
        openmct.objects.addProvider(NAMESPACE, install.couchProvider);
        openmct.objects.addProvider(COUCH_SEARCH_ONLY_NAMESPACE, new CouchSearchProvider(install.couchProvider));
    };
}
