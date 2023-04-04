/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    class="c-elements-pool__group"
    :class="{
        'hover': hover
    }"
    :allow-drop="allowDrop"
    @dragover.prevent
    @dragenter="onDragEnter"
    @dragleave.stop="onDragLeave"
    @drop="emitDrop"
>
    <ul>
        <div>
            <span class="c-elements-pool__grippy c-grippy c-grippy--vertical-drag"></span>
            <div
                class="c-tree__item__type-icon c-object-label__type-icon"
            >
                <span
                    class="is-status__indicator"
                ></span>
            </div>
            <div
                class="c-tree__item__name c-object-label__name"
                :aria-label="`Element Item Group ${label}`"
            >
                {{ label }}
            </div>
        </div>
        <slot></slot>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        parentObject: {
            type: Object,
            required: true,
            default: () => {
                return {};
            }
        },
        label: {
            type: String,
            required: true,
            default: () => {
                return '';
            }
        },
        allowDrop: {
            type: Boolean
        }
    },
    data() {
        return {
            dragCounter: 0
        };
    },
    computed: {
        hover() {
            return this.dragCounter > 0;
        }
    },
    methods: {
        emitDrop(event) {
            this.dragCounter = 0;
            this.$emit('drop-group', event);
        },
        onDragEnter(event) {
            this.dragCounter++;
        },
        onDragLeave(event) {
            this.dragCounter--;
        }
    }
};
</script>
