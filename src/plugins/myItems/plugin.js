/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import { createMyItemsIdentifier } from "./createMyItemsIdentifier";
import myItemsInterceptor from "./myItemsInterceptor";

const MY_ITEMS_DEFAULT_NAME = 'My Items';

export default function MyItemsPlugin(name = MY_ITEMS_DEFAULT_NAME, namespace = '', priority = undefined) {
    return function install(openmct) {
        const identifier = createMyItemsIdentifier(namespace);

        if (priority === undefined) {
            priority = openmct.priority.LOW;
        }

        openmct.objects.addGetInterceptor(myItemsInterceptor(openmct, identifier, name));
        openmct.objects.addRoot(identifier, priority);
    };
}
