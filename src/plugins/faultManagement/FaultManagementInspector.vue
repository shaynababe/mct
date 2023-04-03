/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div
    v-if="isShowDetails"
    class="c-inspector__properties c-inspect-properties"
>
    <div class="c-inspect-properties__header">Fault Details</div>
    <ul
        class="c-inspect-properties__section"
    >
        <DetailText :detail="sourceDetails" />
        <DetailText :detail="occuredDetails" />
        <DetailText :detail="criticalityDetails" />
        <DetailText :detail="descriptionDetails" />
    </ul>

    <div class="c-inspect-properties__header">Telemetry</div>
    <ul
        class="c-inspect-properties__section"
    >
        <DetailText :detail="systemDetails" />
        <DetailText :detail="tripValueDetails" />
        <DetailText :detail="currentValueDetails" />
    </ul>
</div>
</template>

<script>
import DetailText from '../inspectorViews/properties/DetailText.vue';

export default {
    name: 'FaultManagementInspector',
    components: {
        DetailText
    },
    inject: ['openmct'],
    data() {
        return {
            isShowDetails: false
        };
    },
    computed: {
        criticalityDetails() {
            return {
                name: 'Criticality',
                value: this.selectedFault?.severity
            };
        },
        currentValueDetails() {
            return {
                name: 'Live value',
                value: this.selectedFault?.currentValueInfo?.value
            };
        },
        descriptionDetails() {
            return {
                name: 'Description',
                value: this.selectedFault?.shortDescription
            };
        },
        occuredDetails() {
            return {
                name: 'Occured',
                value: this.selectedFault?.triggerTime
            };
        },
        sourceDetails() {
            return {
                name: 'Source',
                value: this.selectedFault?.name
            };
        },
        systemDetails() {
            return {
                name: 'System',
                value: this.selectedFault?.namespace
            };
        },
        tripValueDetails() {
            return {
                name: 'Trip Value',
                value: this.selectedFault?.triggerValueInfo?.value
            };
        }
    },
    mounted() {
        this.updateSelectedFaults();
    },
    methods: {
        updateSelectedFaults() {
            const selection = this.openmct.selection.get();
            this.isShowDetails = false;

            if (selection.length === 0 || selection[0].length < 2) {
                return;
            }

            const selectedFaults = selection[0][1].context.selectedFaults;
            if (selectedFaults.length !== 1) {
                return;
            }

            this.isShowDetails = true;
            this.selectedFault = selectedFaults[0];
        }
    }
};
</script>
