/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div class="c-fault-mgmt__search-row">
    <Search
        class="c-fault-mgmt-search"
        :value="searchTerm"
        @input="updateSearchTerm"
        @clear="updateSearchTerm"
    />

    <SelectField
        class="c-fault-mgmt-viewButton"
        title="View Filter"
        :model="model"
        @onChange="onChange"
    />
</div>
</template>

<script>
import SelectField from '@/api/forms/components/controls/SelectField.vue';
import Search from '@/ui/components/search.vue';

import { FILTER_ITEMS } from './constants';

export default {
    components: {
        SelectField,
        Search
    },
    inject: ['openmct', 'domainObject'],
    props: {
        searchTerm: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            items: []
        };
    },
    computed: {
        model() {
            return {
                options: this.items,
                value: this.items[0] ? this.items[0].value : FILTER_ITEMS[0].toLowerCase()
            };
        }
    },
    mounted() {
        this.items = FILTER_ITEMS
            .map(item => {
                return {
                    name: item,
                    value: item.toLowerCase()
                };
            });
    },
    methods: {
        onChange(data) {
            this.$emit('filterChanged', data);
        },
        updateSearchTerm(searchTerm) {
            this.$emit('updateSearchTerm', searchTerm);
        }
    }
};
</script>
