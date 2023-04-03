/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import Vue from 'vue';

import AbstractStatusIndicator from '../AbstractStatusIndicator';
import OperatorStatusComponent from './OperatorStatus.vue';

export default class OperatorStatusIndicator extends AbstractStatusIndicator {
    createPopupComponent() {
        const indicator = this.getIndicator();
        const popupElement = new Vue({
            components: {
                OperatorStatus: OperatorStatusComponent
            },
            provide: {
                openmct: this.openmct,
                indicator: indicator,
                configuration: this.getConfiguration()
            },
            data() {
                return {
                    positionX: 0,
                    positionY: 0
                };
            },
            template: '<operator-status :positionX="positionX" :positionY="positionY" />'
        }).$mount();

        return popupElement;
    }

    createIndicator() {
        const operatorIndicator = this.openmct.indicators.simpleIndicator();

        operatorIndicator.text("My Operator Status");
        operatorIndicator.description("Set my operator status");
        operatorIndicator.iconClass('icon-status-poll-question-mark');
        operatorIndicator.element.classList.add("c-indicator--operator-status");
        operatorIndicator.element.classList.add("no-minify");
        operatorIndicator.on('click', this.showPopup);

        return operatorIndicator;
    }
}
