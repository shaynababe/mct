/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import EventEmitter from 'EventEmitter';
import _ from 'lodash';

/**
 * Manages selection state for Open MCT
 * @private
 */
export default class Selection extends EventEmitter {
    constructor(openmct) {
        super();

        this.openmct = openmct;
        this.selected = [];
    }
    /**
     * Gets the selected object.
     * @public
     */
    get() {
        return this.selected;
    }
    /**
     * Selects the selectable object and emits the 'change' event.
     *
     * @param {object} selectable an object with element and context properties
     * @param {Boolean} isMultiSelectEvent flag indication shift key is pressed or not
     * @private
     */
    select(selectable, isMultiSelectEvent) {
        if (!Array.isArray(selectable)) {
            selectable = [selectable];
        }

        let multiSelect = isMultiSelectEvent
            && this.parentSupportsMultiSelect(selectable)
            && this.isPeer(selectable)
            && !this.selectionContainsParent(selectable);

        if (multiSelect) {
            this.handleMultiSelect(selectable);
        } else {
            this.handleSingleSelect(selectable);
        }
    }
    /**
             * @private
             */
    handleMultiSelect(selectable) {
        if (this.elementSelected(selectable)) {
            this.remove(selectable);
        } else {
            this.addSelectionAttributes(selectable);
            this.selected.push(selectable);
        }

        this.emit('change', this.selected);
    }
    /**
             * @private
             */
    handleSingleSelect(selectable) {
        if (!_.isEqual([selectable], this.selected)) {
            this.setSelectionStyles(selectable);
            this.selected = [selectable];

            this.emit('change', this.selected);
        }
    }
    /**
             * @private
             */
    elementSelected(selectable) {
        return this.selected.some(selectionPath => _.isEqual(selectionPath, selectable));
    }
    /**
     * @private
     */
    remove(selectable) {
        this.selected = this.selected.filter(selectionPath => !_.isEqual(selectionPath, selectable));

        if (this.selected.length === 0) {
            this.removeSelectionAttributes(selectable);
            selectable[1].element.click(); // Select the parent if there is no selection.
        } else {
            this.removeSelectionAttributes(selectable, true);
        }
    }
    /**
     * @private
     */
    setSelectionStyles(selectable) {
        this.selected.forEach(selectionPath => this.removeSelectionAttributes(selectionPath));
        this.addSelectionAttributes(selectable);
    }
    removeSelectionAttributes(selectionPath, keepParentStyle) {
        if (selectionPath[0] && selectionPath[0].element) {
            selectionPath[0].element.removeAttribute('s-selected');
        }

        if (selectionPath[1] && selectionPath[1].element && !keepParentStyle) {
            selectionPath[1].element.removeAttribute('s-selected-parent');
        }
    }
    /**
     * Adds selection attributes to the selected element and its parent.
     * @private
     */
    addSelectionAttributes(selectable) {
        if (selectable[0] && selectable[0].element) {
            selectable[0].element.setAttribute('s-selected', "");
        }

        if (selectable[1] && selectable[1].element) {
            selectable[1].element.setAttribute('s-selected-parent', "");
        }
    }
    /**
     * @private
     */
    parentSupportsMultiSelect(selectable) {
        return selectable[1] && selectable[1].context.supportsMultiSelect;
    }
    /**
     * @private
     */
    selectionContainsParent(selectable) {
        return this.selected.some(selectionPath => _.isEqual(selectionPath[0], selectable[1]));
    }
    /**
     * @private
     */
    isPeer(selectable) {
        return this.selected.some(selectionPath => _.isEqual(selectionPath[1], selectable[1]));
    }
    /**
     * @private
     */
    isSelectable(element) {
        if (!element) {
            return false;
        }

        return Boolean(element.closest('[data-selectable]'));
    }
    /**
     * @private
     */
    capture(selectable) {
        let capturingContainsSelectable = this.capturing && this.capturing.includes(selectable);

        if (!this.capturing || capturingContainsSelectable) {
            this.capturing = [];
        }

        this.capturing.push(selectable);
    }
    /**
     * @private
     */
    selectCapture(selectable, event) {
        if (!this.capturing) {
            return;
        }

        let reversedCapturing = this.capturing.reverse();
        delete this.capturing;
        this.select(reversedCapturing, event.shiftKey);
    }
    /**
     * Attaches the click handlers to the element.
     *
     * @param element an html element
     * @param context object which defines item or other arbitrary properties.
     * e.g. {
     *          item: domainObject,
     *          elementProxy: element,
     *          controller: fixedController
     *       }
     * @param select a flag to select the element if true
     * @returns a function that removes the click handlers from the element
     * @public
     */
    selectable(element, context, select) {
        if (!this.isSelectable(element)) {
            return () => { };
        }

        let selectable = {
            context: context,
            element: element
        };

        const capture = this.capture.bind(this, selectable);
        const selectCapture = this.selectCapture.bind(this, selectable);
        let removeMutable = false;

        element.addEventListener('click', capture, true);
        element.addEventListener('click', selectCapture);

        if (context.item && context.item.isMutable !== true) {
            removeMutable = true;
            context.item = this.openmct.objects.toMutable(context.item);
        }

        if (select) {
            if (typeof select === 'object') {
                element.dispatchEvent(select);
            } else if (typeof select === 'boolean') {
                element.click();
            }
        }

        return (function () {
            element.removeEventListener('click', capture, true);
            element.removeEventListener('click', selectCapture);

            if (context.item !== undefined && context.item.isMutable && removeMutable === true) {
                this.openmct.objects.destroyMutable(context.item);
            }
        }).bind(this);
    }
}
