/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    class="c-inspector__properties c-inspect-properties"
    aria-label="Tags Inspector"
>
    <div
        class="c-inspect-properties__header"
    >
        Tags
    </div>
    <div
        v-if="shouldShowTagsEditor"
        class="c-inspect-properties__section"
    >
        <TagEditor
            :targets="targetDetails"
            :target-domain-objects="targetDomainObjects"
            :domain-object="domainObject"
            :annotations="loadedAnnotations"
            :annotation-type="annotationType"
            :on-tag-change="onAnnotationChange"
        />
    </div>
    <div
        v-else
        class="c-inspect-properties__row--span-all"
    >
        {{ noTagsMessage }}
    </div>
</div>
</template>

<script>
import TagEditor from './tags/TagEditor.vue';
import _ from 'lodash';

export default {
    components: {
        TagEditor
    },
    inject: ['openmct'],
    data() {
        return {
            selection: null,
            lastLocalAnnotationCreations: {},
            unobserveEntries: {},
            loadedAnnotations: []
        };
    },
    computed: {
        hasAnnotations() {
            return Boolean(
                this.loadedAnnotations
                && this.loadedAnnotations.length
            );
        },
        nonTagAnnotations() {
            if (!this.loadedAnnotations) {
                return [];
            }

            return this.loadedAnnotations.filter(annotation => {
                return !annotation.tags && !annotation._deleted;
            });
        },
        tagAnnotations() {
            if (!this.loadedAnnotations) {
                return [];
            }

            return this.loadedAnnotations.filter(annotation => {
                return !annotation.tags && !annotation._deleted;
            });
        },
        multiSelection() {
            return this.selection && this.selection.length > 1;
        },
        noAnnotationsMessage() {
            return this.multiSelection
                ? 'No annotations to display for multiple items'
                : 'No annotations to display for this item';
        },
        noTagsMessage() {
            return this.multiSelection
                ? 'No tags to display for multiple items'
                : 'No tags to display for this item';
        },
        domainObject() {
            return this?.selection?.[0]?.[0]?.context?.item;
        },
        targetDetails() {
            return this?.selection?.[0]?.[0]?.context?.targetDetails ?? {};
        },
        shouldShowTagsEditor() {
            const showingTagsEditor = Object.keys(this.targetDetails).length > 0;

            if (showingTagsEditor) {
                return true;
            }

            return false;
        },
        targetDomainObjects() {
            return this?.selection?.[0]?.[0]?.context?.targetDomainObjects ?? {};
        },
        selectedAnnotations() {
            return this?.selection?.[0]?.[0]?.context?.annotations;
        },
        annotationType() {
            return this?.selection?.[0]?.[0]?.context?.annotationType;
        },
        annotationFilter() {
            return this?.selection?.[0]?.[0]?.context?.annotationFilter;
        },
        onAnnotationChange() {
            return this?.selection?.[0]?.[0]?.context?.onAnnotationChange;
        }
    },
    async mounted() {
        this.openmct.annotation.on('targetDomainObjectAnnotated', this.loadAnnotationForTargetObject);
        this.openmct.selection.on('change', this.updateSelection);
        await this.updateSelection(this.openmct.selection.get());
    },
    beforeDestroy() {
        this.openmct.selection.off('change', this.updateSelection);
        const unobserveEntryFunctions = Object.values(this.unobserveEntries);
        unobserveEntryFunctions.forEach(unobserveEntry => {
            unobserveEntry();
        });
    },
    methods: {
        loadNewAnnotations(annotationsToLoad) {
            if (!annotationsToLoad || !annotationsToLoad.length) {
                this.loadedAnnotations.splice(0);

                return;
            }

            const sortedAnnotations = annotationsToLoad.sort((annotationA, annotationB) => {
                return annotationB.modified - annotationA.modified;
            });

            const mutableAnnotations = sortedAnnotations.map((annotation) => {
                return this.openmct.objects.toMutable(annotation);
            });

            if (sortedAnnotations.length < this.loadedAnnotations.length) {
                this.loadedAnnotations = this.loadedAnnotations.slice(0, mutableAnnotations.length);
            }

            for (let index = 0; index < mutableAnnotations.length; index += 1) {
                this.$set(this.loadedAnnotations, index, mutableAnnotations[index]);
            }
        },
        updateSelection(selection) {
            const unobserveEntryFunctions = Object.values(this.unobserveEntries);
            unobserveEntryFunctions.forEach(unobserveEntry => {
                unobserveEntry();
            });
            this.unobserveEntries = {};

            this.selection = selection;
            const targetKeys = Object.keys(this.targetDomainObjects);
            targetKeys.forEach(targetKey => {
                const targetObject = this.targetDomainObjects[targetKey];
                this.lastLocalAnnotationCreations[targetKey] = targetObject?.annotationLastCreated ?? 0;
                if (!this.unobserveEntries[targetKey]) {
                    this.unobserveEntries[targetKey] = this.openmct.objects.observe(targetObject, '*', this.targetObjectChanged);
                }
            });
            this.loadNewAnnotations(this.selectedAnnotations);
        },
        async targetObjectChanged(target) {
            const targetID = this.openmct.objects.makeKeyString(target.identifier);
            const lastLocalAnnotationCreation = this.lastLocalAnnotationCreations[targetID] ?? 0;
            if (lastLocalAnnotationCreation < target.annotationLastCreated) {
                this.lastLocalAnnotationCreations[targetID] = target.annotationLastCreated;
                await this.loadAnnotationForTargetObject(target);
            }
        },
        async loadAnnotationForTargetObject(target) {
            const targetID = this.openmct.objects.makeKeyString(target.identifier);
            const allAnnotationsForTarget = await this.openmct.annotation.getAnnotations(target.identifier);
            const filteredAnnotationsForSelection = allAnnotationsForTarget.filter(annotation => {
                const matchingTargetID = Object.keys(annotation.targets).filter(loadedTargetID => {
                    return targetID === loadedTargetID;
                });
                const fetchedTargetDetails = annotation.targets[matchingTargetID];
                const selectedTargetDetails = this.targetDetails[matchingTargetID];

                return _.isEqual(fetchedTargetDetails, selectedTargetDetails);
            });
            this.loadNewAnnotations(filteredAnnotationsForSelection);
        }
    }
};
</script>
