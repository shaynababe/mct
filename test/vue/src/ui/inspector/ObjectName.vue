/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div class="c-inspector__header">
    <div
        v-if="!multiSelect"
        class="c-inspector__selected c-object-label"
        :class="[statusClass]"
    >
        <div
            class="c-object-label__type-icon"
            :class="typeCssClass"
        >
            <span
                class="is-status__indicator"
                :title="`This item is ${status}`"
            ></span>
        </div>
        <span
            v-if="!singleSelectNonObject"
            class="c-inspector__selected c-object-label__name"
        >{{ item.name }}</span>
        <div
            v-if="singleSelectNonObject"
            class="c-inspector__selected c-inspector__selected--non-domain-object  c-object-label"
        >
            <span class="c-object-label__name">{{ heading }}</span>
        </div>
    </div>
    <div
        v-if="multiSelect"
        class="c-inspector__multiple-selected"
    >
        {{ itemsSelected }} items selected
    </div>
</div>
</template>

<script>
export default {
    inject: ['openmct'],
    data() {
        return {
            domainObject: {},
            activity: undefined,
            layoutItem: undefined,
            keyString: undefined,
            multiSelect: false,
            itemsSelected: 0,
            status: undefined
        };
    },
    computed: {
        item() {
            return this.domainObject || {};
        },
        heading() {
            if (this.activity) {
                return this.activity.name;
            }

            return 'Layout Item';
        },
        type() {
            return this.openmct.types.get(this.item.type);
        },
        typeCssClass() {
            if (this.activity) {
                return 'icon-activity';
            }

            if (!this.domainObject && this.layoutItem) {
                const layoutItemType = this.openmct.types.get(this.layoutItem.type);

                return layoutItemType.definition.cssClass;
            }

            if (this.type.definition.cssClass === undefined) {
                return 'icon-object';
            }

            return this.type.definition.cssClass;
        },
        singleSelectNonObject() {
            return !this.item.identifier && !this.multiSelect;
        },
        statusClass() {
            return this.status ? `is-status--${this.status}` : '';
        }
    },
    mounted() {
        this.openmct.selection.on('change', this.updateSelection);
        this.updateSelection(this.openmct.selection.get());
    },
    beforeDestroy() {
        this.openmct.selection.off('change', this.updateSelection);

        if (this.statusUnsubscribe) {
            this.statusUnsubscribe();
        }
    },
    methods: {
        updateSelection(selection) {
            if (this.statusUnsubscribe) {
                this.statusUnsubscribe();
                this.statusUnsubscribe = undefined;
            }

            if (selection.length === 0 || selection[0].length === 0) {
                this.resetDomainObject();

                return;
            }

            if (selection.length > 1) {
                this.multiSelect = true;
                this.itemsSelected = selection.length;
                this.resetDomainObject();

                return;
            } else {
                this.multiSelect = false;
                this.domainObject = selection[0][0].context.item;
                this.activity = selection[0][0].context.activity;
                if (this.domainObject) {
                    this.keyString = this.openmct.objects.makeKeyString(this.domainObject.identifier);
                    this.status = this.openmct.status.get(this.keyString);
                    this.statusUnsubscribe = this.openmct.status.observe(this.keyString, this.updateStatus);
                } else if (selection[0][0].context.layoutItem) {
                    this.layoutItem = selection[0][0].context.layoutItem;
                }
            }
        },
        resetDomainObject() {
            this.domainObject = {};
            this.status = undefined;
            this.keyString = undefined;
        },
        updateStatus(status) {
            this.status = status;
        }
    }
};
</script>
