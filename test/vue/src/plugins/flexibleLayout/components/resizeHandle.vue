/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    v-show="isEditing && !isDragging"
    class="c-fl-frame__resize-handle"
    :class="[orientation]"
    @mousedown="mousedown"
></div>
</template>

<script>
export default {
    props: {
        orientation: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        isEditing: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            initialPos: 0,
            isDragging: false
        };
    },
    mounted() {
        document.addEventListener('dragstart', this.setDragging);
        document.addEventListener('dragend', this.unsetDragging);
        document.addEventListener('drop', this.unsetDragging);
    },
    destroyed() {
        document.removeEventListener('dragstart', this.setDragging);
        document.removeEventListener('dragend', this.unsetDragging);
        document.removeEventListener('drop', this.unsetDragging);
    },
    methods: {
        mousedown(event) {
            event.preventDefault();

            this.$emit('init-move', this.index);

            document.body.addEventListener('mousemove', this.mousemove);
            document.body.addEventListener('mouseup', this.mouseup);
        },
        mousemove(event) {
            event.preventDefault();

            let elSize;
            let mousePos;
            let delta;

            if (this.orientation === 'horizontal') {
                elSize = this.$el.getBoundingClientRect().x;
                mousePos = event.clientX;
            } else {
                elSize = this.$el.getBoundingClientRect().y;
                mousePos = event.clientY;
            }

            delta = mousePos - elSize;

            this.$emit('move', this.index, delta, event);
        },
        mouseup(event) {
            this.$emit('end-move', event);

            document.body.removeEventListener('mousemove', this.mousemove);
            document.body.removeEventListener('mouseup', this.mouseup);
        },
        setDragging(event) {
            this.isDragging = true;
        },
        unsetDragging(event) {
            this.isDragging = false;
        }
    }
};
</script>
