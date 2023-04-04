/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<layout-frame
    :item="item"
    :grid-size="gridSize"
    :is-editing="isEditing"
    @move="(gridDelta) => $emit('move', gridDelta)"
    @endMove="() => $emit('endMove')"
>
    <div
        class="c-text-view u-style-receiver js-style-receiver"
        :data-font-size="item.fontSize"
        :data-font="item.font"
        :class="[styleClass]"
        :style="style"
    >
        <div class="c-text-view__text">{{ item.text }}</div>
    </div>
</layout-frame>
</template>

<script>
import LayoutFrame from './LayoutFrame.vue';
import conditionalStylesMixin from "../mixins/objectStyles-mixin";

export default {
    makeDefinition(openmct, gridSize, element) {
        return {
            fill: '',
            stroke: '',
            color: '',
            x: 1,
            y: 1,
            width: 10,
            height: 5,
            text: element.text,
            fontSize: 'default',
            font: 'default'
        };
    },
    components: {
        LayoutFrame
    },
    mixins: [conditionalStylesMixin],
    inject: ['openmct'],
    props: {
        item: {
            type: Object,
            required: true
        },
        gridSize: {
            type: Array,
            required: true,
            validator: (arr) => arr && arr.length === 2
                && arr.every(el => typeof el === 'number')
        },
        index: {
            type: Number,
            required: true
        },
        initSelect: Boolean,
        isEditing: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        style() {
            let size;
            //legacy size support
            if (!this.item.fontSize) {
                size = this.item.size;
            }

            return Object.assign({
                size
            }, this.itemStyle);
        }
    },
    watch: {
        index(newIndex) {
            if (!this.context) {
                return;
            }

            this.context.index = newIndex;
        },
        item(newItem) {
            if (!this.context) {
                return;
            }

            this.context.layoutItem = newItem;
        }
    },
    mounted() {
        this.context = {
            layoutItem: this.item,
            index: this.index
        };
        this.removeSelectable = this.openmct.selection.selectable(
            this.$el, this.context, this.initSelect);
    },
    destroyed() {
        if (this.removeSelectable) {
            this.removeSelectable();
        }
    }
};
</script>
