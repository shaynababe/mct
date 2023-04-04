/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


<template>
<div
    class="c-compass__hud c-hud"
>
    <div
        v-for="point in visibleCompassPoints"
        :key="point.direction"
        :class="point.class"
        :style="point.style"
    >
        {{ point.direction }}
    </div>
    <div
        v-if="isSunInRange"
        ref="sun"
        class="c-hud__sun"
        :style="sunPositionStyle"
    ></div>
    <div class="c-hud__range"></div>
</div>
</template>

<script>
import {
    rotate,
    inRange,
    percentOfRange
} from './utils';

const COMPASS_POINTS = [
    {
        direction: 'N',
        class: 'c-hud__dir',
        degrees: 0
    },
    {
        direction: 'NE',
        class: 'c-hud__dir--sub',
        degrees: 45
    },
    {
        direction: 'E',
        class: 'c-hud__dir',
        degrees: 90
    },
    {
        direction: 'SE',
        class: 'c-hud__dir--sub',
        degrees: 135
    },
    {
        direction: 'S',
        class: 'c-hud__dir',
        degrees: 180
    },
    {
        direction: 'SW',
        class: 'c-hud__dir--sub',
        degrees: 225
    },
    {
        direction: 'W',
        class: 'c-hud__dir',
        degrees: 270
    },
    {
        direction: 'NW',
        class: 'c-hud__dir--sub',
        degrees: 315
    }
];

export default {
    props: {
        cameraAngleOfView: {
            type: Number,
            required: true
        },
        heading: {
            type: Number,
            required: true
        },
        cameraAzimuth: {
            type: Number,
            default: undefined
        },
        transformations: {
            type: Object,
            required: true
        },
        hasGimble: {
            type: Boolean,
            required: true
        },
        normalizedCameraAzimuth: {
            type: Number,
            required: true
        },
        sunHeading: {
            type: Number,
            default: undefined
        }
    },
    computed: {
        visibleCompassPoints() {
            return COMPASS_POINTS
                .filter(point => inRange(point.degrees, this.visibleRange))
                .map(point => {
                    const percentage = percentOfRange(point.degrees, this.visibleRange);
                    point.style = Object.assign(
                        { left: `${ percentage * 100 }%` }
                    );

                    return point;
                });
        },
        isSunInRange() {
            return inRange(this.sunHeading, this.visibleRange);
        },
        sunPositionStyle() {
            const percentage = percentOfRange(this.sunHeading, this.visibleRange);

            return {
                left: `${ percentage * 100 }%`
            };
        },
        cameraRotation() {
            return this.transformations?.rotation;
        },
        visibleRange() {
            return [
                rotate(this.normalizedCameraAzimuth, -this.cameraAngleOfView / 2),
                rotate(this.normalizedCameraAzimuth, this.cameraAngleOfView / 2)
            ];
        }
    }
};
</script>
