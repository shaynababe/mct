/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div class="c-elements-pool">
    <Search
        class="c-elements-pool__search"
        :value="currentSearch"
        @input="applySearch"
        @clear="applySearch"
    />
    <div
        class="c-elements-pool__elements"
    >
        <ul
            v-if="elements.length > 0"
            id="inspector-elements-tree"
            class="c-tree c-elements-pool__tree"
        >
            <element-item
                v-for="(element, index) in elements"
                :key="element.identifier.key"
                :index="index"
                :element-object="element"
                :allow-drop="allowDrop"
                @dragstart-custom="moveFrom(index)"
                @drop-custom="moveTo(index)"
            />
            <li
                class="js-last-place"
                @drop="moveToIndex(elements.length)"
            ></li>
        </ul>
        <div v-if="elements.length === 0">
            No contained elements
        </div>
    </div>
</div>
</template>

<script>
import _ from 'lodash';
import Search from '../../../ui/components/search.vue';
import ElementItem from './ElementItem.vue';

export default {
    components: {
        Search,
        ElementItem
    },
    inject: [
        'openmct',
        'domainObject'
    ],
    data() {
        return {
            elements: [],
            isEditing: this.openmct.editor.isEditing(),
            currentSearch: '',
            selection: [],
            contextClickTracker: {},
            allowDrop: false
        };
    },
    mounted() {
        let selection = this.openmct.selection.get();
        if (selection && selection.length > 0) {
            this.showSelection(selection);
        }

        this.openmct.selection.on('change', this.showSelection);
        this.openmct.editor.on('isEditing', this.setEditState);
    },
    destroyed() {
        this.openmct.editor.off('isEditing', this.setEditState);
        this.openmct.selection.off('change', this.showSelection);

        if (this.compositionUnlistener) {
            this.compositionUnlistener();
        }
    },
    methods: {
        setEditState(isEditing) {
            this.isEditing = isEditing;
            this.showSelection(this.openmct.selection.get());
        },
        showSelection(selection) {
            if (_.isEqual(this.selection, selection)) {
                return;
            }

            this.selection = selection;
            this.elements = [];
            this.elementsCache = {};
            this.listeners = [];

            if (this.compositionUnlistener) {
                this.compositionUnlistener();
            }

            if (this.domainObject) {
                this.composition = this.openmct.composition.get(this.domainObject);

                if (this.composition) {
                    this.composition.load();

                    this.composition.on('add', this.addElement);
                    this.composition.on('remove', this.removeElement);
                    this.composition.on('reorder', this.reorderElements);

                    this.compositionUnlistener = () => {
                        this.composition.off('add', this.addElement);
                        this.composition.off('remove', this.removeElement);
                        this.composition.off('reorder', this.reorderElements);
                        delete this.compositionUnlistener;
                    };
                }
            }
        },
        addElement(element) {
            let keyString = this.openmct.objects.makeKeyString(element.identifier);
            this.elementsCache[keyString] =
                JSON.parse(JSON.stringify(element));
            this.applySearch(this.currentSearch);
        },
        reorderElements() {
            this.applySearch(this.currentSearch);
        },
        removeElement(identifier) {
            let keyString = this.openmct.objects.makeKeyString(identifier);
            delete this.elementsCache[keyString];
            this.applySearch(this.currentSearch);
        },
        applySearch(input) {
            this.currentSearch = input;
            this.elements = this.domainObject.composition.map((id) =>
                this.elementsCache[this.openmct.objects.makeKeyString(id)]
            ).filter((element) => {
                return element !== undefined
                    && element.name.toLowerCase().search(this.currentSearch) !== -1;
            });
        },
        moveTo(moveToIndex) {
            if (this.allowDrop) {
                this.composition.reorder(this.moveFromIndex, moveToIndex);
                this.allowDrop = false;
            }
        },
        moveFrom(index) {
            this.allowDrop = true;
            this.moveFromIndex = index;
        }
    }
};
</script>
