/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
<template>
<div class="l-preview-window js-preview-window">
    <PreviewHeader
        :current-view="currentViewProvider"
        :action-collection="actionCollection"
        :domain-object="domainObject"
        :views="viewProviders"
    />
    <div class="l-preview-window__object-view js-notebook-snapshot-item">
        <div ref="objectView"></div>
    </div>
</div>
</template>

<script>
import PreviewHeader from './preview-header.vue';
import {STYLE_CONSTANTS} from "@/plugins/condition/utils/constants";
import StyleRuleManager from "@/plugins/condition/StyleRuleManager";

export default {
    components: {
        PreviewHeader
    },
    inject: [
        'openmct',
        'objectPath'
    ],
    props: {
        viewOptions: {
            type: Object,
            default() {
                return undefined;
            }
        },
        existingView: {
            type: Object,
            default() {
                return undefined;
            }
        }
    },
    data() {
        let domainObject = this.objectPath[0];

        return {
            domainObject: domainObject,
            viewKey: undefined,
            viewProviders: [],
            currentViewProvider: {},
            actionCollection: undefined,
            existingViewIndex: 0
        };
    },
    mounted() {
        this.viewProviders = this.openmct.objectViews.get(this.domainObject, this.objectPath);
        this.viewProviders.forEach((provider, index) => {
            provider.onItemClicked = () => {
                if (this.existingView && provider.key === this.existingView.key) {
                    this.existingViewIndex = index;
                }

                this.setView(provider);
            };
        });

        this.setView(this.viewProviders[0]);
    },
    beforeDestroy() {
        if (this.stopListeningStyles) {
            this.stopListeningStyles();
        }

        if (this.styleRuleManager) {
            this.styleRuleManager.destroy();
            delete this.styleRuleManager;
        }

        if (this.actionCollection) {
            this.actionCollection.destroy();
        }
    },
    destroyed() {
        if (!this.existingView) {
            this.view.destroy();
        } else if (this.existingViewElement) {
            // if the existing view element is populated, it's the currently viewed view
            // in preview and we need to add it back to the parent.
            this.addExistingViewBackToParent();
        }
    },
    methods: {
        clear() {
            if (this.view) {
                if (this.view !== this.existingView) {
                    this.view.destroy();
                } else {
                    this.addExistingViewBackToParent();
                }

                this.$refs.objectView.innerHTML = '';
                delete this.view;
                delete this.viewContainer;
            }
        },
        setView(viewProvider) {
            if (this.viewKey === viewProvider.key) {
                return;
            }

            const isExistingView = viewProvider.key === this.existingView?.key;

            this.clear();

            this.viewKey = viewProvider.key;
            this.initializeViewContainer();

            if (isExistingView) {
                this.view = this.existingView;
                this.existingViewElement = this.existingView.parentElement.firstChild;
                this.currentViewProvider = this.viewProviders[this.existingViewIndex];
            } else {
                this.currentViewProvider = viewProvider;
                this.view = this.currentViewProvider.view(this.domainObject, this.objectPath);
            }

            this.getActionsCollection(this.view);

            if (isExistingView) {
                this.viewContainer.appendChild(this.existingViewElement);
            } else {
                this.view.show(this.viewContainer, false, this.viewOptions);
            }

            this.initObjectStyles();
        },
        addExistingViewBackToParent() {
            this.existingView.parentElement.appendChild(this.existingViewElement);
            delete this.existingViewElement;
        },
        initializeViewContainer() {
            this.viewContainer = document.createElement('div');
            this.viewContainer.classList.add('l-angular-ov-wrapper');
            this.$refs.objectView.append(this.viewContainer);
        },
        getActionsCollection(view) {
            if (this.actionCollection) {
                this.actionCollection.destroy();
            }

            this.actionCollection = this.openmct.actions.getActionsCollection(this.objectPath, view);
        },
        initObjectStyles() {
            if (!this.styleRuleManager) {
                this.styleRuleManager = new StyleRuleManager((this.domainObject.configuration && this.domainObject.configuration.objectStyles), this.openmct, this.updateStyle.bind(this));
            } else {
                this.styleRuleManager.updateObjectStyleConfig(this.domainObject.configuration && this.domainObject.configuration.objectStyles);
            }

            if (this.stopListeningStyles) {
                this.stopListeningStyles();
            }

            this.stopListeningStyles = this.openmct.objects.observe(this.domainObject, 'configuration.objectStyles', (newObjectStyle) => {
                //Updating styles in the inspector view will trigger this so that the changes are reflected immediately
                this.styleRuleManager.updateObjectStyleConfig(newObjectStyle);
            });
        },
        updateStyle(styleObj) {
            if (!styleObj) {
                return;
            }

            let keys = Object.keys(styleObj);
            let firstChild = this.$refs.objectView.querySelector(':first-child');

            keys.forEach(key => {
                if (firstChild) {
                    if ((typeof styleObj[key] === 'string') && (styleObj[key].indexOf('__no_value') > -1)) {
                        if (firstChild.style[key]) {
                            firstChild.style[key] = '';
                        }
                    } else {
                        if (!styleObj.isStyleInvisible && firstChild.classList.contains(STYLE_CONSTANTS.isStyleInvisible)) {
                            firstChild.classList.remove(STYLE_CONSTANTS.isStyleInvisible);
                        } else if (styleObj.isStyleInvisible && !firstChild.classList.contains(styleObj.isStyleInvisible)) {
                            firstChild.classList.add(styleObj.isStyleInvisible);
                        }

                        firstChild.style[key] = styleObj[key];
                    }
                }
            });
        }
    }
};
</script>
