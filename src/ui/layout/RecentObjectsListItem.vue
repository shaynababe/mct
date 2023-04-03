/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<li
    class="c-recentobjects-listitem c-recentobjects-listitem--object"
    :class="isAlias"
    :aria-label="`${domainObject.name}`"
>
    <div
        class="c-recentobjects-listitem__type-icon recent-object-icon"
        :class="resultTypeIcon"
    ></div>
    <div
        class="c-recentobjects-listitem__body"
    >
        <span
            class="c-recentobjects-listitem__title"
            :name="domainObject.name"
            draggable="true"
            @dragstart="dragStart"
            @click.prevent="clickedRecent"
        >
            {{ domainObject.name }}
        </span>

        <ObjectPath
            class="c-recentobjects-listitem__object-path"
            :read-only="false"
            :domain-object="domainObject"
            :show-original-path="false"
            :object-path="objectPath"
        />
    </div>
    <div class="c-recentobjects-listitem__target-button">
        <button
            class="c-icon-button icon-target"
            :aria-label="`Open and scroll to ${domainObject.name}`"
            @click="openAndScrollTo(navigationPath)"
        ></button>
    </div>
</li>
</template>

<script>
import ObjectPath from '../components/ObjectPath.vue';
import PreviewAction from '../preview/PreviewAction';

export default {
    name: 'RecentObjectsListItem',
    components: {
        ObjectPath
    },
    inject: ['openmct'],
    props: {
        domainObject: {
            type: Object,
            required: true
        },
        navigationPath: {
            type: String,
            required: true
        },
        objectPath: {
            type: Array,
            required: true
        }
    },
    computed: {
        isAlias() {
            return this.openmct.objects.isObjectPathToALink(this.domainObject, this.objectPath) ? { 'is-alias': true } : undefined;
        },
        resultTypeIcon() {
            return this.openmct.types.get(this.domainObject.type).definition.cssClass;
        }
    },
    mounted() {
        this.previewAction = new PreviewAction(this.openmct);
        this.previewAction.on('isVisible', this.togglePreviewState);
    },
    destroyed() {
        this.previewAction.off('isVisible', this.togglePreviewState);
    },
    methods: {
        clickedRecent(_event) {
            if (this.openmct.editor.isEditing()) {
                this.preview();
            } else {
                this.openmct.router.navigate(`#${this.navigationPath}`);
            }
        },
        togglePreviewState(previewState) {
            this.$emit('preview-changed', previewState);
        },
        preview() {
            if (this.previewAction.appliesTo(this.objectPath)) {
                this.previewAction.invoke(this.objectPath);
            }
        },
        dragStart(event) {
            const navigatedObject = this.openmct.router.path[0];
            const serializedPath = JSON.stringify(this.objectPath);
            const keyString = this.openmct.objects.makeKeyString(this.domainObject.identifier);
            if (this.openmct.composition.checkPolicy(navigatedObject, this.domainObject)) {
                event.dataTransfer.setData("openmct/composable-domain-object", JSON.stringify(this.domainObject));
            }

            event.dataTransfer.setData("openmct/domain-object-path", serializedPath);
            event.dataTransfer.setData(`openmct/domain-object/${keyString}`, this.domainObject);
        },
        openAndScrollTo(navigationPath) {
            this.$emit('openAndScrollTo', navigationPath);
        }
    }
};
</script>
