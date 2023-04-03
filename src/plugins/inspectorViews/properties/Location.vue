/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div
    class="c-inspect-properties c-inspect-properties--location"
>
    <div
        class="c-inspect-properties__header"
        title="The location of this linked object."
    >
        Original Location
    </div>
    <ul
        class="c-inspect-properties__section"
    >
        <li
            class="c-inspect-properties__row"
        >
            <ul class="c-inspect-properties__value c-location">
                <li
                    v-for="pathObject in orderedPathBreadCrumb"
                    :key="pathObject.key"
                    class="c-location__item"
                >
                    <object-label
                        :domain-object="pathObject.domainObject"
                        :object-path="pathObject.objectPath"
                    />
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
import ObjectLabel from '../../../ui/components/ObjectLabel.vue';

export default {
    components: {
        ObjectLabel
    },
    inject: [
        'openmct'
    ],
    props: {
        domainObject: {
            type: Object,
            default: undefined
        },
        parentDomainObject: {
            type: Object,
            default: undefined
        }
    },
    data() {
        return {
            pathBreadCrumb: []
        };
    },
    computed: {
        orderedPathBreadCrumb() {
            return this.pathBreadCrumb.slice().reverse();
        }
    },
    async mounted() {
        await this.createPathBreadCrumb();
    },
    methods: {
        async createPathBreadCrumb() {
            if (!this.domainObject && this.parentDomainObject) {
                this.setPathBreadCrumb([this.parentDomainObject]);
            } else {
                const keyString = this.openmct.objects.makeKeyString(this.domainObject.identifier);
                const originalPath = await this.openmct.objects.getOriginalPath(keyString);
                const originalPathWithoutSelf = originalPath.slice(1, -1);

                this.setPathBreadCrumb(originalPathWithoutSelf);
            }

        },
        setPathBreadCrumb(path) {
            const pathBreadCrumb = path.map((domainObject, index, pathArray) => {
                const key = this.openmct.objects.makeKeyString(domainObject.identifier);

                return {
                    domainObject,
                    key,
                    objectPath: pathArray.slice(index)
                };
            });

            this.pathBreadCrumb = pathBreadCrumb;
        }
    }
};
</script>
