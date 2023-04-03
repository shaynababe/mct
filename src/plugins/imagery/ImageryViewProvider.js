/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import ImageryView from './ImageryView';

export default function ImageryViewProvider(openmct, options) {
    const type = 'example.imagery';

    function hasImageTelemetry(domainObject) {
        const metadata = openmct.telemetry.getMetadata(domainObject);
        if (!metadata) {
            return false;
        }

        return metadata.valuesForHints(['image']).length > 0;
    }

    return {
        key: type,
        name: 'Imagery Layout',
        cssClass: 'icon-image',
        canView: function (domainObject, objectPath) {
            let isChildOfTimeStrip = objectPath.find(object => object.type === 'time-strip');

            return hasImageTelemetry(domainObject) && (!isChildOfTimeStrip || openmct.router.isNavigatedObject(objectPath));
        },
        view: function (domainObject, objectPath) {
            return new ImageryView(openmct, domainObject, objectPath, options);
        }
    };
}
