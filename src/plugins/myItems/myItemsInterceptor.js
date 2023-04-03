/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { MY_ITEMS_KEY } from "./createMyItemsIdentifier";

function myItemsInterceptor(openmct, identifierObject, name) {

    const myItemsModel = {
        identifier: identifierObject,
        name,
        type: "folder",
        composition: [],
        location: "ROOT"
    };

    return {
        appliesTo: (identifier) => {
            return identifier.key === MY_ITEMS_KEY;
        },
        invoke: (identifier, object) => {
            if (!object || openmct.objects.isMissing(object)) {
                openmct.objects.save(myItemsModel);

                return myItemsModel;
            }

            return object;
        },
        priority: openmct.priority.HIGH
    };
}

export default myItemsInterceptor;
