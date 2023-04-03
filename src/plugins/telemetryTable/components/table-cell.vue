/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

<template>
<td
    :title="formattedValue"
    @click="selectCell($event.currentTarget, columnKey)"
>
    {{ formattedValue }}
</td>
</template>

<script>
export default {
    inject: ['openmct'],
    props: {
        row: {
            type: Object,
            required: true
        },
        columnKey: {
            type: String,
            required: true
        },
        objectPath: {
            type: Array,
            required: true
        }
    },
    computed: {
        formattedValue() {
            return this.row.getFormattedValue(this.columnKey);
        },
        isSelectable() {
            let column = this.row.columns[this.columnKey];

            return column && column.selectable;
        }
    },
    methods: {
        selectCell(element, columnKey) {
            if (this.isSelectable) {
                this.openmct.selection.select([{
                    element: element,
                    context: {
                        type: 'table-cell',
                        row: this.row.objectKeyString,
                        column: columnKey
                    }
                }, {
                    element: this.openmct.layout.$refs.browseObject.$el,
                    context: {
                        item: this.objectPath[0]
                    }
                }], false);
                event.stopPropagation();
            }
        }
    }
};
</script>
