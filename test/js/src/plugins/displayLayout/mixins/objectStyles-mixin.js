/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import StyleRuleManager from "@/plugins/condition/StyleRuleManager";
import {getStylesWithoutNoneValue} from "@/plugins/condition/utils/styleUtils";

export default {
    inject: ['openmct'],
    data() {
        return {
            objectStyle: undefined,
            itemStyle: undefined,
            styleClass: ''
        };
    },
    mounted() {
        this.parentDomainObject = this.$parent.domainObject;
        this.itemId = this.item.id;
        this.objectStyle = this.getObjectStyleForItem(this.parentDomainObject.configuration.objectStyles);
        this.initObjectStyles();
    },
    beforeDestroy() {
        if (this.stopListeningObjectStyles) {
            this.stopListeningObjectStyles();
        }

        if (this.styleRuleManager) {
            this.styleRuleManager.destroy();
        }
    },
    methods: {
        getObjectStyleForItem(objectStyle) {
            if (objectStyle) {
                return objectStyle[this.itemId] ? Object.assign({}, objectStyle[this.itemId]) : undefined;
            } else {
                return undefined;
            }
        },
        initObjectStyles() {
            if (!this.styleRuleManager) {
                this.styleRuleManager = new StyleRuleManager(this.objectStyle, this.openmct, this.updateStyle.bind(this), true);
            } else {
                this.styleRuleManager.updateObjectStyleConfig(this.objectStyle);
            }

            if (this.stopListeningObjectStyles) {
                this.stopListeningObjectStyles();
            }

            this.stopListeningObjectStyles = this.openmct.objects.observe(this.parentDomainObject, 'configuration.objectStyles', (newObjectStyle) => {
                //Updating object styles in the inspector view will trigger this so that the changes are reflected immediately
                let newItemObjectStyle = this.getObjectStyleForItem(newObjectStyle);
                if (this.objectStyle !== newItemObjectStyle) {
                    this.objectStyle = newItemObjectStyle;
                    this.styleRuleManager.updateObjectStyleConfig(this.objectStyle);
                }
            });
        },
        updateStyle(style) {
            this.itemStyle = getStylesWithoutNoneValue(style);
            this.styleClass = this.itemStyle && this.itemStyle.isStyleInvisible;
        }
    }
};
