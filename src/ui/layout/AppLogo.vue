/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
<template>
<div
    ref="aboutLogo"
    class="l-shell__app-logo"
    @click="launchAbout"
></div>
</template>

<script>
import AboutDialog from './AboutDialog.vue';
import Vue from 'vue';

export default {
    inject: ['openmct'],
    mounted() {
        let branding = this.openmct.branding();
        if (branding.smallLogoImage) {
            this.$refs.aboutLogo.style.backgroundImage = `url('${branding.smallLogoImage}')`;
        }
    },
    methods: {
        launchAbout() {
            let vm = new Vue({
                components: {AboutDialog},
                provide: {
                    openmct: this.openmct
                },
                template: '<about-dialog></about-dialog>'
            }).$mount();

            this.openmct.overlays.overlay({
                element: vm.$el,
                size: 'large'
            });
        }
    }
};
</script>
