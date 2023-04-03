/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div v-show="isValidTarget">
    <div
        class="c-drop-hint c-drop-hint--always-show"
        :class="{'is-mouse-over': isMouseOver}"
        @dragover.prevent
        @dragenter="dragenter"
        @dragleave="dragleave"
        @drop="dropHandler"
    ></div>
</div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            required: true
        },
        allowDrop: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            isMouseOver: false,
            isValidTarget: false
        };
    },
    mounted() {
        document.addEventListener('dragstart', this.dragstart);
        document.addEventListener('dragend', this.dragend);
        document.addEventListener('drop', this.dragend);
    },
    destroyed() {
        document.removeEventListener('dragstart', this.dragstart);
        document.removeEventListener('dragend', this.dragend);
        document.removeEventListener('drop', this.dragend);
    },
    methods: {
        dragenter() {
            this.isMouseOver = true;
        },
        dragleave() {
            this.isMouseOver = false;
        },
        dropHandler(event) {
            this.$emit('object-drop-to', this.index, event);
            this.isValidTarget = false;
        },
        dragstart(event) {
            this.isValidTarget = this.allowDrop(event, this.index);
        },
        dragend() {
            this.isValidTarget = false;
        }
    }
};
</script>
