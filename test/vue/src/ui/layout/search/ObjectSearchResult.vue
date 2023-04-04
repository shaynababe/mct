/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    class="c-gsearch-result c-gsearch-result--object"
    aria-label="Search Result"
    role="presentation"
>
    <div
        class="c-gsearch-result__type-icon"
        :class="resultTypeIcon"
    ></div>
    <div
        class="c-gsearch-result__body"
        role="option"
        :aria-label="`${resultName} ${resultType} result`"
    >
        <div
            class="c-gsearch-result__title"
            :name="resultName"
            draggable="true"
            @dragstart="dragStart"
            @click="clickedResult"
        >
            {{ resultName }}
        </div>

        <ObjectPath
            :read-only="false"
            :domain-object="result"
        />
    </div>
    <div class="c-gsearch-result__more-options-button">
        <button class="c-icon-button icon-3-dots"></button>
    </div>
</div>
</template>

<script>
import ObjectPath from '../../components/ObjectPath.vue';
import identifierToString from '../../../tools/url';
import PreviewAction from '../../preview/PreviewAction';

export default {
    name: 'ObjectSearchResult',
    components: {
        ObjectPath
    },
    inject: ['openmct'],
    props: {
        result: {
            type: Object,
            required: true,
            default() {
                return {};
            }
        }
    },
    computed: {
        resultName() {
            return this.result.name;
        },
        resultTypeIcon() {
            return this.openmct.types.get(this.result.type).definition.cssClass;
        },
        resultType() {
            return this.result.type;
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
        clickedResult(event) {
            const { objectPath } = this.result;
            if (this.openmct.editor.isEditing()) {
                event.preventDefault();
                this.preview(objectPath);
            } else {
                let resultUrl = identifierToString(this.openmct, objectPath);

                // Remove the vestigial 'ROOT' identifier from url if it exists
                if (resultUrl.includes('/ROOT')) {
                    resultUrl = resultUrl.split('/ROOT').join('');
                }

                this.openmct.router.navigate(resultUrl);
            }
        },
        togglePreviewState(previewState) {
            this.$emit('preview-changed', previewState);
        },
        preview(objectPath) {
            if (this.previewAction.appliesTo(objectPath)) {
                this.previewAction.invoke(objectPath);
            }
        },
        dragStart(event) {
            const navigatedObject = this.openmct.router.path[0];
            const { objectPath } = this.result;
            const serializedPath = JSON.stringify(objectPath);
            const keyString = this.openmct.objects.makeKeyString(this.result.identifier);
            if (this.openmct.composition.checkPolicy(navigatedObject, this.result)) {
                event.dataTransfer.setData("openmct/composable-domain-object", JSON.stringify(this.result));
            }

            event.dataTransfer.setData("openmct/domain-object-path", serializedPath);
            event.dataTransfer.setData(`openmct/domain-object/${keyString}`, this.result);
        }
    }
};
</script>
