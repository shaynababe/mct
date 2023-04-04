/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import raf from '@/utils/raf';

export default class AbstractStatusIndicator {
    #popupComponent;
    #indicator;
    #configuration;

    /**
     * @param {*} openmct the Open MCT API (proper typescript doc to come)
     * @param {import('@/api/user/UserAPI').UserAPIConfiguration} configuration Per-deployment status styling. See the type definition in UserAPI
     */
    constructor(openmct, configuration) {
        this.openmct = openmct;
        this.#configuration = configuration;

        this.showPopup = this.showPopup.bind(this);
        this.clearPopup = this.clearPopup.bind(this);
        this.positionBox = this.positionBox.bind(this);
        this.positionBox = raf(this.positionBox);

        this.#indicator = this.createIndicator();
        this.#popupComponent = this.createPopupComponent();
    }

    install() {
        this.openmct.indicators.add(this.#indicator);
    }

    showPopup() {
        const popupElement = this.getPopupElement();

        document.body.appendChild(popupElement.$el);
        //Use capture so we don't trigger immediately on the same iteration of the event loop
        document.addEventListener('click', this.clearPopup, {
            capture: true
        });

        this.positionBox();

        window.addEventListener('resize', this.positionBox);
    }

    positionBox() {
        const popupElement = this.getPopupElement();
        const indicator = this.getIndicator();

        let indicatorBox = indicator.element.getBoundingClientRect();
        popupElement.positionX = indicatorBox.left;
        popupElement.positionY = indicatorBox.bottom;

        const popupRight = popupElement.positionX + popupElement.$el.clientWidth;
        const offsetLeft = Math.min(window.innerWidth - popupRight, 0);
        popupElement.positionX = popupElement.positionX + offsetLeft;
    }

    clearPopup(clickAwayEvent) {
        const popupElement = this.getPopupElement();

        if (!popupElement.$el.contains(clickAwayEvent.target)) {
            popupElement.$el.remove();
            document.removeEventListener('click', this.clearPopup);
            window.removeEventListener('resize', this.positionBox);
        }
    }

    createPopupComponent() {
        throw new Error('Must override createPopupElement method');
    }

    getPopupElement() {
        return this.#popupComponent;
    }

    createIndicator() {
        throw new Error('Must override createIndicator method');
    }

    getIndicator() {
        return this.#indicator;
    }

    getConfiguration() {
        return this.#configuration;
    }
}
