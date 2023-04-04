/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<FaultManagementListView
    :faults-list="faultsList"
/>
</template>

<script>

import FaultManagementListView from './FaultManagementListView.vue';
import { FAULT_MANAGEMENT_ALARMS, FAULT_MANAGEMENT_GLOBAL_ALARMS } from './constants';

export default {
    components: {
        FaultManagementListView
    },
    inject: ['openmct', 'domainObject'],
    data() {
        return {
            faultsList: []
        };
    },
    mounted() {
        this.unsubscribe = this.openmct.faults
            .subscribe(this.domainObject, this.updateFault);
    },
    beforeDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    },
    methods: {
        updateFault({ fault, type }) {
            if (type === FAULT_MANAGEMENT_GLOBAL_ALARMS) {
                this.updateFaultList();
            } else if (type === FAULT_MANAGEMENT_ALARMS) {
                this.faultsList.forEach((faultValue, i) => {
                    if (fault.id === faultValue.id) {
                        this.$set(this.faultsList, i, fault);
                    }
                });
            }
        },
        updateFaultList() {
            this.openmct.faults
                .request(this.domainObject)
                .then(faultsData => {
                    if (faultsData?.length > 0) {
                        this.faultsList = faultsData.map(fd => fd.fault);
                    } else {
                        this.faultsList = [];
                    }
                });
        }
    }
};
</script>
