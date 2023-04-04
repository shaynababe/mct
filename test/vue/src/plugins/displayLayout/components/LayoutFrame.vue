/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    class="l-layout__frame c-frame"
    :class="{
        'no-frame': !item.hasFrame,
        'u-inspectable': inspectable
    }"
    :style="style"
>
    <slot></slot>
    <div
        class="c-frame__move-bar"
        @mousedown.left="startMove($event)"
    ></div>
</div>
</template>

<script>
import LayoutDrag from './../LayoutDrag';
import _ from 'lodash';

export default {
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
        isEditing: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        size() {
            let {width, height} = this.item;

            return {
                width: (this.gridSize[0] * width),
                height: (this.gridSize[1] * height)
            };
        },
        style() {
            let {x, y, width, height} = this.item;

            return {
                left: (this.gridSize[0] * x) + 'px',
                top: (this.gridSize[1] * y) + 'px',
                width: (this.gridSize[0] * width) + 'px',
                height: (this.gridSize[1] * height) + 'px',
                minWidth: (this.gridSize[0] * width) + 'px',
                minHeight: (this.gridSize[1] * height) + 'px'
            };
        },
        inspectable() {
            return this.item.type === 'subobject-view' || this.item.type === 'telemetry-view';
        }
    },
    methods: {
        updatePosition(event) {
            let currentPosition = [event.pageX, event.pageY];
            this.initialPosition = this.initialPosition || currentPosition;
            this.delta = currentPosition.map(function (value, index) {
                return value - this.initialPosition[index];
            }.bind(this));
        },
        startMove(event, posFactor = [1, 1], dimFactor = [0, 0]) {
            if (!this.isEditing) {
                return;
            }

            document.body.addEventListener('mousemove', this.continueMove);
            document.body.addEventListener('mouseup', this.endMove);
            this.dragPosition = {
                position: [this.item.x, this.item.y]
            };
            this.updatePosition(event);
            this.activeDrag = new LayoutDrag(this.dragPosition, posFactor, dimFactor, this.gridSize);
            event.preventDefault();
        },
        continueMove(event) {
            event.preventDefault();
            this.updatePosition(event);
            let newPosition = this.activeDrag.getAdjustedPosition(this.delta);

            if (!_.isEqual(newPosition, this.dragPosition)) {
                this.dragPosition = newPosition;
                this.$emit('move', this.toGridDelta(this.delta));
            }
        },
        endMove(event) {
            document.body.removeEventListener('mousemove', this.continueMove);
            document.body.removeEventListener('mouseup', this.endMove);
            this.continueMove(event);
            this.$emit('endMove');
            this.dragPosition = undefined;
            this.initialPosition = undefined;
            this.delta = undefined;
            event.preventDefault();
        },
        toGridDelta(pixelDelta) {
            return pixelDelta.map((v, i) => {
                return Math.round(v / this.gridSize[i]);
            });
        }
    }
};
</script>
