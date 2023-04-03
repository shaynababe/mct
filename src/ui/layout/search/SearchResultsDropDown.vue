/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div
    class="c-gsearch__dropdown"
>
    <div
        v-show="resultsShown"
        class="c-gsearch__results-wrapper"
    >
        <div
            class="c-gsearch__results"
            :class="{ 'search-finished' : !searchLoading }"
        >
            <div
                v-if="objectResults && objectResults.length"
                ref="objectResults"
                class="c-gsearch__results-section"
                role="listbox"
            >
                <div class="c-gsearch__results-section-title">Object Results</div>
                <object-search-result
                    v-for="(objectResult) in objectResults"
                    :key="openmct.objects.makeKeyString(objectResult.identifier)"
                    :result="objectResult"
                    @preview-changed="previewChanged"
                    @click.native="selectedResult"
                />
            </div>
            <div
                v-if="annotationResults && annotationResults.length"
                ref="annotationResults"
            >
                <div class="c-gsearch__results-section-title">Annotation Results</div>
                <annotation-search-result
                    v-for="(annotationResult) in annotationResults"
                    :key="makeKeyForAnnotationResult(annotationResult)"
                    :result="annotationResult"
                    @click.native="selectedResult"
                />
            </div>
            <div
                v-if="searchLoading"
                class="c-gsearch__result-pane-msg"
            >
                <div class="hint">Searching...</div>
                <progress-bar :model="{ progressPerc: undefined }" />
            </div>
            <div
                v-if="!searchLoading && (!annotationResults || !annotationResults.length) &&
                    (!objectResults || !objectResults.length)"
                class="c-gsearch__result-pane-msg"
            >
                <div class="hint">No results found</div>
            </div>
        </div>
    </div>
</div></template>

<script>
import AnnotationSearchResult from './AnnotationSearchResult.vue';
import ObjectSearchResult from './ObjectSearchResult.vue';
import ProgressBar from '@/ui/components/ProgressBar.vue';

export default {
    name: 'SearchResultsDropDown',
    components: {
        AnnotationSearchResult,
        ObjectSearchResult,
        ProgressBar
    },
    inject: ['openmct'],
    data() {
        return {
            resultsShown: false,
            searchLoading: false,
            annotationResults: [],
            objectResults: [],
            previewVisible: false
        };
    },
    methods: {
        selectedResult() {
            if (!this.previewVisible) {
                this.resultsShown = false;
            }
        },
        makeKeyForAnnotationResult(annotationResult) {
            const annotationKeyString = this.openmct.objects.makeKeyString(annotationResult.identifier);
            const firstTargetKeyString = Object.keys(annotationResult.targets)[0];

            return `${annotationKeyString}-${firstTargetKeyString}`;
        },
        previewChanged(changedPreviewState) {
            this.previewVisible = changedPreviewState;
        },
        showSearchStarted() {
            this.searchLoading = true;
            this.resultsShown = true;
            this.annotationResults = [];
            this.objectResults = [];
        },
        showResults({searchLoading, searchValue, annotationSearchResults, objectSearchResults}) {
            this.searchLoading = searchLoading;
            this.annotationResults = annotationSearchResults;
            this.objectResults = objectSearchResults;
            if (searchValue?.length) {
                this.resultsShown = true;
            } else {
                this.resultsShown = false;
            }
        }
    },
    template: 'Dropdown'
};
</script>
