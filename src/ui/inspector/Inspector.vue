/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div class="c-inspector js-inspector">
    <object-name />
    <InspectorTabs
        :selection="selection"
        :is-editing="isEditing"
        @select-tab="selectTab"
    />
    <InspectorViews
        :selection="selection"
        :selected-tab="selectedTab"
    />
</div>
</template>

<script>
import ObjectName from './ObjectName.vue';
import InspectorTabs from './InspectorTabs.vue';
import InspectorViews from './InspectorViews.vue';

export default {
    components: {
        ObjectName,
        InspectorTabs,
        InspectorViews
    },
    inject: ['openmct'],
    props: {
        isEditing: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            selection: this.openmct.selection.get(),
            selectedTab: undefined
        };
    },
    mounted() {
        this.openmct.selection.on('change', this.setSelection);
    },
    destroyed() {
        this.openmct.selection.off('change', this.setSelection);
    },
    methods: {
        setSelection(selection) {
            this.selection = selection;
        },
        selectTab(tab) {
            this.selectedTab = tab;
        }
    }
};
</script>
