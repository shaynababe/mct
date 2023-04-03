
/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    class="c-fl-frame"
    :style="{
        'flex-basis': `${frame.size}%`
    }"
>
    <div
        ref="frame"
        class="c-frame c-fl-frame__drag-wrapper is-selectable u-inspectable is-moveable"
        :draggable="draggable"
        @dragstart="initDrag"
    >
        <object-frame
            v-if="domainObject"
            ref="objectFrame"
            :domain-object="domainObject"
            :object-path="currentObjectPath"
            :has-frame="hasFrame"
            :show-edit-view="false"
        />

        <div
            v-if="isEditing"
            v-show="frame.size && frame.size < 100"
            class="c-fl-frame__size-indicator"
        >
            {{ frame.size }}%
        </div>
    </div>
</div>
</template>

<script>
import ObjectFrame from '../../../ui/components/ObjectFrame.vue';

export default {
    components: {
        ObjectFrame
    },
    inject: ['openmct'],
    props: {
        frame: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        containerIndex: {
            type: Number,
            required: true
        },
        isEditing: {
            type: Boolean,
            default: false
        },
        objectPath: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            domainObject: undefined,
            currentObjectPath: undefined
        };
    },
    computed: {
        hasFrame() {
            return !this.frame.noFrame;
        },
        draggable() {
            return this.isEditing;
        }
    },
    mounted() {
        if (this.frame.domainObjectIdentifier) {
            if (this.openmct.objects.supportsMutation(this.frame.domainObjectIdentifier)) {
                this.domainObjectPromise = this.openmct.objects.getMutable(this.frame.domainObjectIdentifier);
            } else {
                this.domainObjectPromise = this.openmct.objects.get(this.frame.domainObjectIdentifier);
            }

            this.domainObjectPromise.then((object) => {
                this.setDomainObject(object);
            });
        }

        this.dragGhost = document.getElementById('js-fl-drag-ghost');
    },
    beforeDestroy() {
        if (this.domainObjectPromise) {
            this.domainObjectPromise.then(() => {
                if (this?.domainObject?.isMutable) {
                    this.openmct.objects.destroyMutable(this.domainObject);
                }
            });
        } else if (this?.domainObject?.isMutable) {
            this.openmct.objects.destroyMutable(this.domainObject);
        }

        if (this.unsubscribeSelection) {
            this.unsubscribeSelection();
        }
    },
    methods: {
        setDomainObject(object) {
            this.domainObject = object;
            this.currentObjectPath = [object].concat(this.objectPath);
            this.setSelection();
        },
        setSelection() {
            this.$nextTick(() => {
                if (this.$refs && this.$refs.objectFrame) {
                    let childContext = this.$refs.objectFrame.getSelectionContext();
                    childContext.item = this.domainObject;
                    childContext.type = 'frame';
                    childContext.frameId = this.frame.id;
                    this.unsubscribeSelection = this.openmct.selection.selectable(
                        this.$refs.frame, childContext, false);
                }
            });
        },
        initDrag(event) {
            let type = this.openmct.types.get(this.domainObject.type);
            let iconClass = type.definition ? type.definition.cssClass : 'icon-object-unknown';

            if (this.dragGhost) {
                let originalClassName = this.dragGhost.classList[0];
                this.dragGhost.className = '';
                this.dragGhost.classList.add(originalClassName, iconClass);

                this.dragGhost.innerHTML = `<span>${this.domainObject.name}</span>`;
                event.dataTransfer.setDragImage(this.dragGhost, 0, 0);
            }

            event.dataTransfer.setData('frameid', this.frame.id);
            event.dataTransfer.setData('containerIndex', this.containerIndex);
        }
    }
};
</script>
