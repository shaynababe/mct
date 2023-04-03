/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


export default function MissingObjectInterceptor(openmct) {
    openmct.objects.addGetInterceptor({
        appliesTo: (identifier, domainObject) => {
            return true;
        },
        invoke: (identifier, object) => {
            if (object === undefined) {
                const keyString = openmct.objects.makeKeyString(identifier);
                openmct.notifications.error(`Failed to retrieve object ${keyString}`, { minimized: true });

                return {
                    identifier,
                    type: 'unknown',
                    name: 'Missing: ' + keyString
                };
            }

            return object;
        }
    });
}
