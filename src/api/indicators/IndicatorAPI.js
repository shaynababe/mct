/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import EventEmitter from "EventEmitter";
import SimpleIndicator from "./SimpleIndicator";

class IndicatorAPI extends EventEmitter {
    constructor(openmct) {
        super();

        this.openmct = openmct;
        this.indicatorObjects = [];
    }

    getIndicatorObjectsByPriority() {
        const sortedIndicators = this.indicatorObjects.sort((a, b) => b.priority - a.priority);

        return sortedIndicators;
    }

    simpleIndicator() {
        return new SimpleIndicator(this.openmct);
    }

    /**
     * Accepts an indicator object, which is a simple object
     * with a two attributes: 'element' which has an HTMLElement
     * as its value, and 'priority' with an integer that specifies its order in the layout.
     * The lower the priority, the further to the right the element is placed.
     * If undefined, the priority will be assigned -1.
     *
     * We provide .simpleIndicator() as a convenience function
     * which will create a default Open MCT indicator that can
     * be passed to .add(indicator). This indicator also exposes
     * functions for changing its appearance to support customization
     * and dynamic behavior.
     *
     * Eg.
     * const myIndicator = openmct.indicators.simpleIndicator();
     * openmct.indicators.add(myIndicator);
     *
     * myIndicator.text("Hello World!");
     * myIndicator.iconClass("icon-info");
     *
     */
    add(indicator) {
        if (!indicator.priority) {
            indicator.priority = this.openmct.priority.DEFAULT;
        }

        this.indicatorObjects.push(indicator);

        this.emit('addIndicator', indicator);
    }

}

export default IndicatorAPI;
