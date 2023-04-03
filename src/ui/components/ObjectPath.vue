/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<ul
    v-if="orderedPath.length"
    class="c-location"
    :aria-label="`${domainObject.name}`"
    role="navigation"
>
    <li
        v-for="pathObject in orderedPath"
        :key="pathObject.key"
        class="c-location__item"
    >
        <object-label
            :domain-object="pathObject.domainObject"
            :object-path="pathObject.objectPath"
            :read-only="readOnly"
            :navigate-to-path="navigateToPath(pathObject.objectPath)"
        />
    </li>
</ul>
</template>

<script>
import ObjectLabel from './ObjectLabel.vue';

export default {
    components: {
        ObjectLabel
    },
    inject: ['openmct'],
    props: {
        domainObject: {
            type: Object,
            required: true
        },
        readOnly: {
            type: Boolean,
            required: false,
            default() {
                return false;
            }
        },
        showObjectItself: {
            type: Boolean,
            required: false,
            default() {
                return false;
            }
        },
        objectPath: {
            type: Array,
            default() {
                return null;
            }
        }
    },
    data() {
        return {
            orderedPath: []
        };
    },
    async mounted() {
        const keyString = this.openmct.objects.makeKeyString(this.domainObject.identifier);

        if (keyString && this.keyString !== keyString) {
            this.keyString = keyString;
            this.originalPath = [];

            let rawPath = null;
            if (this.objectPath === null) {
                rawPath = await this.openmct.objects.getOriginalPath(keyString);
            } else {
                rawPath = this.objectPath;
            }

            const pathWithDomainObject = rawPath.map((domainObject, index, pathArray) => {
                let key = this.openmct.objects.makeKeyString(domainObject.identifier);
                const objectPath = pathArray.slice(index);

                return {
                    domainObject,
                    key,
                    objectPath
                };
            });
            if (this.showObjectItself) {
                // remove ROOT only
                this.orderedPath = pathWithDomainObject.slice(0, pathWithDomainObject.length - 1).reverse();
            } else {
                // remove ROOT and object itself from path
                this.orderedPath = pathWithDomainObject.slice(1, pathWithDomainObject.length - 1).reverse();
            }
        }
    },
    methods: {
        /**
         * Generate the hash url for the given object path, removing the '/ROOT' prefix if present.
         * @param {import('../../api/objects/ObjectAPI').DomainObject[]} objectPath
         */
        navigateToPath(objectPath) {
            /** @type {String} */
            const path = `/browse/${this.openmct.objects.getRelativePath(objectPath)}`;

            return path.replace('ROOT/', '');
        }
    }
};
</script>
