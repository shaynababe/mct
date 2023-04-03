/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import EventEmitter from 'EventEmitter';
import indicatorTemplate from './res/indicator-template.html';
import { convertTemplateToHTML } from '@/utils/template/templateHelpers';

const DEFAULT_ICON_CLASS = 'icon-info';

class SimpleIndicator extends EventEmitter {
    constructor(openmct) {
        super();

        this.openmct = openmct;
        this.element = convertTemplateToHTML(indicatorTemplate)[0];
        this.priority = openmct.priority.DEFAULT;

        this.textElement = this.element.querySelector('.js-indicator-text');

        //Set defaults
        this.text('New Indicator');
        this.description('');
        this.iconClass(DEFAULT_ICON_CLASS);

        this.click = this.click.bind(this);

        this.element.addEventListener('click', this.click);
        openmct.once('destroy', () => {
            this.removeAllListeners();
            this.element.removeEventListener('click', this.click);
        });
    }

    text(text) {
        if (text !== undefined && text !== this.textValue) {
            this.textValue = text;
            this.textElement.innerText = text;

            if (!text) {
                this.element.classList.add('hidden');
            } else {
                this.element.classList.remove('hidden');
            }
        }

        return this.textValue;
    }

    description(description) {
        if (description !== undefined && description !== this.descriptionValue) {
            this.descriptionValue = description;
            this.element.title = description;
        }

        return this.descriptionValue;
    }

    iconClass(iconClass) {
        if (iconClass !== undefined && iconClass !== this.iconClassValue) {
            // element.classList is precious and throws errors if you try and add
            // or remove empty strings
            if (this.iconClassValue) {
                this.element.classList.remove(this.iconClassValue);
            }

            if (iconClass) {
                this.element.classList.add(iconClass);
            }

            this.iconClassValue = iconClass;
        }

        return this.iconClassValue;
    }

    statusClass(statusClass) {
        if (arguments.length === 1 && statusClass !== this.statusClassValue) {
            if (this.statusClassValue) {
                this.element.classList.remove(this.statusClassValue);
            }

            if (statusClass !== undefined) {
                this.element.classList.add(statusClass);
            }

            this.statusClassValue = statusClass;
        }

        return this.statusClassValue;
    }

    click(event) {
        this.emit('click', event);
    }

    getElement() {
        return this.element;
    }
}

export default SimpleIndicator;
