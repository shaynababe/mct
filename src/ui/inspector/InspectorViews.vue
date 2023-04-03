/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div
    class="c-inspector__content"
    role="tabpanel"
    aria-label="Inspector Views"
></div>
</template>

<script>
export default {
    inject: ['openmct'],
    props: {
        selectedTab: {
            type: Object,
            default: undefined
        },
        selection: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    watch: {
        selection() {
            this.updateSelectionViews();
        },
        selectedTab() {
            this.clearAndShowViewsForTab();
        }
    },
    methods: {
        updateSelectionViews(selection) {
            this.clearViews();
            this.selectedViews = this.openmct.inspectorViews.get(this.selection);
            this.showViewsForTab();
        },
        clearViews() {
            if (this.visibleViews) {
                this.visibleViews.forEach(visibleView => {
                    visibleView.destroy();
                });

                this.visibleViews = [];
                this.$el.innerHTML = '';
            }
        },
        showViewsForTab() {
            this.visibleViews = this.selectedViews
                .filter(view => view.key === this.selectedTab.key);

            this.visibleViews.forEach(visibleView => {
                let viewContainer = document.createElement('div');
                this.$el.append(viewContainer);
                visibleView.show(viewContainer);
            });
        },
        clearAndShowViewsForTab() {
            this.clearViews();
            this.showViewsForTab();
        }
    }
};
</script>
