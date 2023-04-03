/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div class="c-faults-list-view">
    <FaultManagementSearch
        :search-term="searchTerm"
        @filterChanged="updateFilter"
        @updateSearchTerm="updateSearchTerm"
    />

    <FaultManagementToolbar
        v-if="showToolbar"
        :selected-faults="selectedFaults"
        @acknowledgeSelected="toggleAcknowledgeSelected"
        @shelveSelected="toggleShelveSelected"
    />

    <div class="c-faults-list-view-header-item-container-wrapper">
        <div class="c-faults-list-view-header-item-container">
            <FaultManagementListHeader
                class="header"
                :selected-faults="Object.values(selectedFaults)"
                :total-faults-count="filteredFaultsList.length"
                @selectAll="selectAll"
                @sortChanged="sortChanged"
            />

            <div class="c-faults-list-view-item-body">
                <template v-if="filteredFaultsList.length > 0">
                    <FaultManagementListItem
                        v-for="fault of filteredFaultsList"
                        :key="fault.id"
                        :fault="fault"
                        :is-selected="isSelected(fault)"
                        @toggleSelected="toggleSelected"
                        @acknowledgeSelected="toggleAcknowledgeSelected"
                        @shelveSelected="toggleShelveSelected"
                    />
                </template>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import FaultManagementListHeader from './FaultManagementListHeader.vue';
import FaultManagementListItem from './FaultManagementListItem.vue';
import FaultManagementSearch from './FaultManagementSearch.vue';
import FaultManagementToolbar from './FaultManagementToolbar.vue';

import { FAULT_MANAGEMENT_SHELVE_DURATIONS_IN_MS, FILTER_ITEMS, SORT_ITEMS } from './constants';

const SEARCH_KEYS = ['id', 'triggerValueInfo', 'currentValueInfo', 'triggerTime', 'severity', 'name', 'shortDescription', 'namespace'];

export default {
    components: {
        FaultManagementListHeader,
        FaultManagementListItem,
        FaultManagementSearch,
        FaultManagementToolbar
    },
    inject: ['openmct', 'domainObject'],
    props: {
        faultsList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            filterIndex: 0,
            searchTerm: '',
            selectedFaults: {},
            sortBy: Object.values(SORT_ITEMS)[0].value
        };
    },
    computed: {
        filteredFaultsList() {
            const filterName = FILTER_ITEMS[this.filterIndex];
            let list = this.faultsList;

            // Exclude shelved alarms from all views except the Shelved view
            if (filterName !== 'Shelved') {
                list = list.filter(fault => fault.shelved !== true);
            }

            if (filterName === 'Acknowledged') {
                list = list.filter(fault => fault.acknowledged);
            } else if (filterName === 'Unacknowledged') {
                list = list.filter(fault => !fault.acknowledged);
            } else if (filterName === 'Shelved') {
                list = list.filter(fault => fault.shelved);
            }

            if (this.searchTerm.length > 0) {
                list = list.filter(this.filterUsingSearchTerm);
            }

            list.sort(SORT_ITEMS[this.sortBy].sortFunction);

            return list;
        },
        showToolbar() {
            return this.openmct.faults.supportsActions();
        }
    },
    methods: {
        filterUsingSearchTerm(fault) {
            if (!fault) {
                return false;
            }

            let match = false;

            SEARCH_KEYS.forEach((key) => {
                if (fault[key]?.toString().toLowerCase().includes(this.searchTerm)) {
                    match = true;
                }
            });

            return match;
        },
        isSelected(fault) {
            return Boolean(this.selectedFaults[fault.id]);
        },
        selectAll(toggle = false) {
            this.faultsList.forEach(fault => {
                const faultData = {
                    fault,
                    selected: toggle
                };
                this.toggleSelected(faultData);
            });
        },
        sortChanged(sort) {
            this.sortBy = sort.value;
        },
        toggleSelected({ fault, selected = false}) {
            if (selected) {
                this.$set(this.selectedFaults, fault.id, fault);
            } else {
                this.$delete(this.selectedFaults, fault.id);
            }

            const selectedFaults = Object.values(this.selectedFaults);
            this.openmct.selection.select(
                [
                    {
                        element: this.$el,
                        context: {
                            item: this.openmct.router.path[0]
                        }
                    },
                    {
                        element: this.$el,
                        context: {
                            selectedFaults
                        }
                    }
                ],
                false);
        },
        toggleAcknowledgeSelected(faults = Object.values(this.selectedFaults)) {
            let title = '';
            if (faults.length > 1) {
                title = `Acknowledge ${faults.length} selected faults`;
            } else {
                title = `Acknowledge fault: ${faults[0].name}`;
            }

            const formStructure = {
                title,
                sections: [
                    {
                        rows: [
                            {
                                key: 'comment',
                                control: 'textarea',
                                name: 'Optional comment',
                                pattern: '\\S+',
                                required: false,
                                cssClass: 'l-input-lg',
                                value: ''
                            }
                        ]
                    }
                ],
                buttons: {
                    submit: {
                        label: 'Acknowledge'
                    }
                }
            };

            this.openmct.forms.showForm(formStructure)
                .then(data => {
                    Object.values(faults)
                        .forEach(selectedFault => {
                            this.openmct.faults.acknowledgeFault(selectedFault, data);
                        });
                });

            this.selectedFaults = {};
        },
        async toggleShelveSelected(faults = Object.values(this.selectedFaults), shelveData = {}) {
            const { shelved = true } = shelveData;
            if (shelved) {
                let title = faults.length > 1
                    ? `Shelve ${faults.length} selected faults`
                    : `Shelve fault: ${faults[0].name}`
                ;

                const formStructure = {
                    title,
                    sections: [
                        {
                            rows: [
                                {
                                    key: 'comment',
                                    control: 'textarea',
                                    name: 'Optional comment',
                                    pattern: '\\S+',
                                    required: false,
                                    cssClass: 'l-input-lg',
                                    value: ''
                                },
                                {
                                    key: 'shelveDuration',
                                    control: 'select',
                                    name: 'Shelve duration',
                                    options: FAULT_MANAGEMENT_SHELVE_DURATIONS_IN_MS,
                                    required: false,
                                    cssClass: 'l-input-lg',
                                    value: FAULT_MANAGEMENT_SHELVE_DURATIONS_IN_MS[0].value
                                }
                            ]
                        }
                    ],
                    buttons: {
                        submit: {
                            label: 'Shelve'
                        }
                    }
                };

                let data;
                try {
                    data = await this.openmct.forms.showForm(formStructure);
                } catch (e) {
                    return;
                }

                shelveData.comment = data.comment || '';
                shelveData.shelveDuration = data.shelveDuration !== undefined
                    ? data.shelveDuration
                    : FAULT_MANAGEMENT_SHELVE_DURATIONS_IN_MS[0].value;
            } else {
                shelveData = {
                    shelved: false
                };
            }

            Object.values(faults)
                .forEach(selectedFault => {
                    this.openmct.faults.shelveFault(selectedFault, shelveData);
                });

            this.selectedFaults = {};
        },
        updateFilter(filter) {
            this.selectAll();

            this.filterIndex = filter.model.options.findIndex(option => option.value === filter.value);
        },
        updateSearchTerm(term = '') {
            this.searchTerm = term.toLowerCase();
        }
    }
};
</script>
