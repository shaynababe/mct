/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<li
    draggable="true"
    @dragstart="emitDragStartEvent"
    @dragenter="onDragenter"
    @dragover.prevent
    @dragleave="onDragleave"
    @drop="emitDropEvent"
>
    <div
        class="c-tree__item c-elements-pool__item js-elements-pool__item"
        :class="{
            'is-context-clicked': contextClickActive,
            'hover': hover,
            'is-alias': isAlias
        }"
    >
        <span
            class="c-elements-pool__grippy c-grippy c-grippy--vertical-drag"
        ></span>
        <object-label
            :domain-object="elementObject"
            :object-path="[elementObject, domainObject]"
            @context-click-active="setContextClickState"
        />
    </div>
</li>
</template>

<script>
import ObjectLabel from '../../../ui/components/ObjectLabel.vue';

export default {
    components: {
        ObjectLabel
    },
    inject: [
        'openmct',
        'domainObject'
    ],
    props: {
        index: {
            type: Number,
            required: true,
            default: () => {
                return 0;
            }
        },
        elementObject: {
            type: Object,
            required: true,
            default: () => {
                return {};
            }
        },
        allowDrop: {
            type: Boolean
        }
    },
    data() {
        const isAlias = this.elementObject.location !== this.openmct.objects.makeKeyString(this.domainObject.identifier);

        return {
            contextClickActive: false,
            hover: false,
            isAlias
        };
    },
    methods: {
        emitDropEvent(event) {
            this.$emit('drop-custom', event);
            this.hover = false;
        },
        emitDragStartEvent(event) {
            this.$emit('dragstart-custom', this.index);
        },
        onDragenter(event) {
            if (this.allowDrop) {
                this.hover = true;
                this.dragElement = event.target.parentElement;
            }
        },
        onDragleave(event) {
            if (event.target.parentElement === this.dragElement) {
                this.hover = false;
                delete this.dragElement;
            }
        },
        setContextClickState(state) {
            this.contextClickActive = state;
        }
    }
};
</script>
