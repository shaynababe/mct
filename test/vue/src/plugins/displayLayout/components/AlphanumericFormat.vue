/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    class="c-inspect-properties"
>
    <ul class="c-inspect-properties__section">
        <li class="c-inspect-properties__row">
            <div
                class="c-inspect-properties__label"
                title="Printf formatting for the selected telemetry"
            >
                <label for="telemetryPrintfFormat">Format</label>
            </div>
            <div class="c-inspect-properties__value">
                <input
                    id="telemetryPrintfFormat"
                    type="text"
                    :disabled="!isEditing"
                    :value="telemetryFormat"
                    :placeholder="nonMixedFormat ? '' : 'Mixed'"
                    @change="formatTelemetry"
                >
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'AlphanumericFormat',
    inject: ['openmct', 'objectPath'],
    data() {
        return {
            isEditing: this.openmct.editor.isEditing(),
            telemetryFormat: undefined,
            nonMixedFormat: false
        };
    },
    mounted() {
        this.openmct.editor.on('isEditing', this.toggleEdit);
        this.openmct.selection.on('change', this.handleSelection);
        this.handleSelection(this.openmct.selection.get());
    },
    destroyed() {
        this.openmct.editor.off('isEditing', this.toggleEdit);
        this.openmct.selection.off('change', this.handleSelection);
    },
    methods: {
        toggleEdit(isEditing) {
            this.isEditing = isEditing;
        },
        formatTelemetry(event) {
            const newFormat = event.currentTarget.value;
            this.openmct.selection.get().forEach(selectionPath => {
                selectionPath[0].context.updateTelemetryFormat(newFormat);
            });
            this.telemetryFormat = newFormat;
        },
        handleSelection(selection) {
            if (selection.length === 0 || selection[0].length < 2) {
                return;
            }

            let layoutItem = selection[0][0].context.layoutItem;

            if (!layoutItem) {
                return;
            }

            let format = layoutItem.format;
            this.nonMixedFormat = selection.every(selectionPath => {
                return selectionPath[0].context.layoutItem.format === format;
            });

            this.telemetryFormat = this.nonMixedFormat ? format : '';
        }
    }
};

</script>
