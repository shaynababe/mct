/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import availableTags from './tags.json';

/**
@typedef {{
    namespaceToSaveAnnotations: string
}} TagsPluginOptions
*/

/**
 * @typedef {TagsPluginOptions} options
 * @returns {function} The plugin install function
 */
export default function exampleTagsPlugin(options) {
    return function install(openmct) {
        if (options?.namespaceToSaveAnnotations) {
            openmct.annotation.setNamespaceToSaveAnnotations(options?.namespaceToSaveAnnotations);
        }

        Object.keys(availableTags.tags).forEach(tagKey => {
            const tagDefinition = availableTags.tags[tagKey];
            openmct.annotation.defineTag(tagKey, tagDefinition);
        });
    };
}
