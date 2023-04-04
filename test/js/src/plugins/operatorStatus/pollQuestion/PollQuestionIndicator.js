/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import Vue from 'vue';

import AbstractStatusIndicator from '../AbstractStatusIndicator';
import PollQuestionComponent from './PollQuestion.vue';

export default class PollQuestionIndicator extends AbstractStatusIndicator {
    createPopupComponent() {
        const indicator = this.getIndicator();
        const pollQuestionElement = new Vue({
            components: {
                PollQuestion: PollQuestionComponent
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
            template: '<poll-question :positionX="positionX" :positionY="positionY" />'
        }).$mount();

        return pollQuestionElement;
    }

    createIndicator() {
        const pollQuestionIndicator = this.openmct.indicators.simpleIndicator();

        pollQuestionIndicator.text("No Poll Question");
        pollQuestionIndicator.description("Set the current poll question");
        pollQuestionIndicator.iconClass('icon-status-poll-edit');
        pollQuestionIndicator.element.classList.add("c-indicator--operator-status");
        pollQuestionIndicator.element.classList.add("no-minify");
        pollQuestionIndicator.on('click', this.showPopup);

        return pollQuestionIndicator;
    }
}
