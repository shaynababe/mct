/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div class="c-notebook__search-results">
    <div class="c-notebook__search-results__header">Search Results ({{ results.length }})</div>
    <div class="c-notebook__entries">
        <NotebookEntry
            v-for="(result, index) in results"
            :key="index"
            :domain-object="domainObject"
            :result="result"
            :entry="result.entry"
            :read-only="true"
            :selected-page="result.page"
            :selected-section="result.section"
            :is-locked="result.page.isLocked"
            @editingEntry="editingEntry"
            @cancelEdit="cancelEdit"
            @changeSectionPage="changeSectionPage"
            @updateEntries="updateEntries"
        />
    </div>
</div>
</template>

<script>
import NotebookEntry from './NotebookEntry.vue';

export default {
    components: {
        NotebookEntry
    },
    inject: ['openmct', 'snapshotContainer'],
    props: {
        domainObject: {
            type: Object,
            default() {
                return {};
            }
        },
        results: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        editingEntry() {
            this.$emit('editingEntry');
        },
        cancelEdit() {
            this.$emit('cancelEdit');
        },
        changeSectionPage(data) {
            this.$emit('changeSectionPage', data);
        },
        updateEntries(entries) {
            this.$emit('updateEntries', entries);
        }
    }
};
</script>
