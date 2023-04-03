/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div class="c-fault-mgmt-item-header c-fault-mgmt__list-header c-fault-mgmt__list">
    <div class="c-fault-mgmt-item-header c-fault-mgmt__checkbox">
        <input
            type="checkbox"
            :checked="isSelectAll"
            @input="selectAll"
        >
    </div>
    <div class="c-fault-mgmt-item-header c-fault-mgmt__list-header-results c-fault-mgmt__list-severity">
        {{ totalFaultsCount }} Results
    </div>
    <div class="c-fault-mgmt__list-header-content">
        <div class="c-fault-mgmt__list-content-right">
            <div class="c-fault-mgmt-item-header c-fault-mgmt__list-header-tripVal">Trip Value</div>
            <div class="c-fault-mgmt-item-header c-fault-mgmt__list-header-liveVal">Live Value</div>
            <div class="c-fault-mgmt-item-header c-fault-mgmt__list-header-trigTime">Trigger Time</div>
        </div>
    </div>
    <div class=" c-fault-mgmt-item-header c-fault-mgmt__list-header-action-wrapper">
        <div class="c-fault-mgmt__list-header-sortButton c-fault-mgmt__list-action-button">
            <SelectField
                class="c-fault-mgmt-viewButton"
                title="Sort By"
                :model="model"
                @onChange="onChange"
            />
        </div>
    </div>
</div>
</template>

<script>
import SelectField from '@/api/forms/components/controls/SelectField.vue';

import { SORT_ITEMS } from './constants';

export default {
    components: {
        SelectField
    },
    inject: ['openmct', 'domainObject'],
    props: {
        selectedFaults: {
            type: Array,
            default() {
                return [];
            }
        },
        totalFaultsCount: {
            type: Number,
            default() {
                return 0;
            }
        }
    },
    data() {
        return {
            model: {}
        };
    },
    computed: {
        isSelectAll() {
            return this.totalFaultsCount > 0 && this.selectedFaults.length === this.totalFaultsCount;
        }
    },
    beforeMount() {
        const options = Object.values(SORT_ITEMS);
        this.model = {
            options,
            value: options[0].value
        };
    },
    methods: {
        onChange(data) {
            this.$emit('sortChanged', data);
        },
        selectAll(e) {
            this.$emit('selectAll', e.target.checked);
        }
    }
};
</script>
