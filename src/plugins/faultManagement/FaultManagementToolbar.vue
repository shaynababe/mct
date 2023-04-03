/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div class="c-fault-mgmt__toolbar">
    <button
        class="c-icon-button icon-check"
        title="Acknowledge selected faults"
        :disabled="disableAcknowledge"
        @click="acknowledgeSelected"
    >
        <div
            title="Acknowledge selected faults"
            class="c-icon-button__label"
        >
            Acknowledge
        </div>
    </button>

    <button
        class="c-icon-button icon-timer"
        title="Shelve selected faults"
        :disabled="disableShelve"
        @click="shelveSelected"
    >
        <div
            title="Shelve selected items"
            class="c-icon-button__label"
        >
            Shelve
        </div>
    </button>
</div>
</template>

<script>
export default {
    inject: ['openmct', 'domainObject'],
    props: {
        selectedFaults: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            disableAcknowledge: true,
            disableShelve: true
        };
    },
    watch: {
        selectedFaults(newSelectedFaults) {
            const selectedfaults = Object.values(newSelectedFaults);

            let disableAcknowledge = true;
            let disableShelve = true;

            selectedfaults.forEach(fault => {
                if (!fault.shelved) {
                    disableShelve = false;
                }

                if (!fault.acknowledged) {
                    disableAcknowledge = false;
                }
            });

            this.disableAcknowledge = disableAcknowledge;
            this.disableShelve = disableShelve;
        }
    },
    methods: {
        acknowledgeSelected() {
            this.$emit('acknowledgeSelected');
        },
        shelveSelected() {
            this.$emit('shelveSelected');
        }
    }
};
</script>
