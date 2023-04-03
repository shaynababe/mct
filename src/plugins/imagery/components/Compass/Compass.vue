/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div
    class="c-compass"
    :style="`width: 100%; height: 100%`"
>
    <CompassHUD
        :camera-angle-of-view="cameraAngleOfView"
        :heading="heading"
        :camera-azimuth="cameraAzimuth"
        :transformations="transformations"
        :has-gimble="hasGimble"
        :normalized-camera-azimuth="normalizedCameraAzimuth"
        :sun-heading="sunHeading"
    />
    <CompassRose
        :camera-angle-of-view="cameraAngleOfView"
        :heading="heading"
        :camera-azimuth="cameraAzimuth"
        :transformations="transformations"
        :has-gimble="hasGimble"
        :normalized-camera-azimuth="normalizedCameraAzimuth"
        :sun-heading="sunHeading"
        :sized-image-dimensions="sizedImageDimensions"
    />
</div>
</template>

<script>
import CompassHUD from './CompassHUD.vue';
import CompassRose from './CompassRose.vue';
import { rotate } from './utils';

export default {
    components: {
        CompassHUD,
        CompassRose
    },
    props: {
        image: {
            type: Object,
            required: true
        },
        sizedImageDimensions: {
            type: Object,
            required: true
        }
    },
    computed: {
        hasGimble() {
            return this.cameraAzimuth !== undefined;
        },
        // compass ordinal orientation of camera
        normalizedCameraAzimuth() {
            return this.hasGimble
                ? rotate(this.cameraAzimuth)
                : rotate(this.heading, -this.transformations.rotation || 0);
        },
        // horizontal rotation from north in degrees
        heading() {
            return this.image.heading;
        },
        hasHeading() {
            return this.heading !== undefined;
        },
        // horizontal rotation from north in degrees
        sunHeading() {
            return this.image.sunOrientation;
        },
        // horizontal rotation from north in degrees
        cameraAzimuth() {
            return this.image.cameraPan;
        },
        cameraAngleOfView() {
            return this.transformations.cameraAngleOfView;
        },
        transformations() {
            return this.image.transformations;
        }
    },
    methods: {
        toggleLockCompass() {
            this.$emit('toggle-lock-compass');
        }
    }
};
</script>
