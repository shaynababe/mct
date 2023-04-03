/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import StyleRuleManager from "@/plugins/condition/StyleRuleManager";
import {STYLE_CONSTANTS} from "@/plugins/condition/utils/constants";

export default {
    inject: ['openmct', 'domainObject', 'path'],
    data() {
        return {
            objectStyle: undefined
        };
    },
    mounted() {
        this.objectStyles = this.getObjectStyleForItem(this.childObject.configuration);
        this.initObjectStyles();
    },
    beforeDestroy() {
        if (this.stopListeningStyles) {
            this.stopListeningStyles();
        }

        if (this.styleRuleManager) {
            this.styleRuleManager.destroy();
        }
    },
    methods: {
        getObjectStyleForItem(config) {
            if (config && config.objectStyles) {
                return config.objectStyles ? Object.assign({}, config.objectStyles) : undefined;
            } else {
                return undefined;
            }
        },
        initObjectStyles() {
            if (!this.styleRuleManager) {
                this.styleRuleManager = new StyleRuleManager(this.objectStyles, this.openmct, this.updateStyle.bind(this), true);
            } else {
                this.styleRuleManager.updateObjectStyleConfig(this.objectStyles);
            }

            if (this.stopListeningStyles) {
                this.stopListeningStyles();
            }

            this.stopListeningStyles = this.openmct.objects.observe(this.childObject, 'configuration.objectStyles', (newObjectStyle) => {
                //Updating styles in the inspector view will trigger this so that the changes are reflected immediately
                this.styleRuleManager.updateObjectStyleConfig(newObjectStyle);
            });

            if (this.childObject && this.childObject.configuration && this.childObject.configuration.fontStyle) {
                const { fontSize, font } = this.childObject.configuration.fontStyle;
                this.setFontSize(fontSize);
                this.setFont(font);
            }

            this.stopListeningFontStyles = this.openmct.objects.observe(this.childObject, 'configuration.fontStyle', (newFontStyle) => {
                this.setFontSize(newFontStyle.fontSize);
                this.setFont(newFontStyle.font);
            });
        },
        getStyleReceiver() {
            let styleReceiver;

            if (this.$el !== undefined) {
                styleReceiver = this.$el.querySelector('.js-style-receiver')
                    || this.$el.querySelector(':first-child');

                if (styleReceiver === null) {
                    styleReceiver = undefined;
                }
            }

            return styleReceiver;
        },
        setFontSize(newSize) {
            let elemToStyle = this.getStyleReceiver();

            if (elemToStyle !== undefined) {
                elemToStyle.dataset.fontSize = newSize;
            }
        },
        setFont(newFont) {
            let elemToStyle = this.getStyleReceiver();

            if (elemToStyle !== undefined) {
                elemToStyle.dataset.font = newFont;
            }
        },
        updateStyle(styleObj) {
            let elemToStyle = this.getStyleReceiver();

            if (!styleObj || elemToStyle === undefined) {
                return;
            }

            let keys = Object.keys(styleObj);

            keys.forEach(key => {
                if (elemToStyle) {
                    if ((typeof styleObj[key] === 'string') && (styleObj[key].indexOf('__no_value') > -1)) {
                        if (elemToStyle.style[key]) {
                            elemToStyle.style[key] = '';
                        }
                    } else {
                        if (!styleObj.isStyleInvisible && elemToStyle.classList.contains(STYLE_CONSTANTS.isStyleInvisible)) {
                            elemToStyle.classList.remove(STYLE_CONSTANTS.isStyleInvisible);
                        } else if (styleObj.isStyleInvisible && !elemToStyle.classList.contains(styleObj.isStyleInvisible)) {
                            elemToStyle.classList.add(styleObj.isStyleInvisible);
                        }

                        elemToStyle.style[key] = styleObj[key];
                    }
                }
            });
        }
    }
};
