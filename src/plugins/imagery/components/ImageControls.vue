/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div
    class="h-local-controls h-local-controls--overlay-content h-local-controls--menus-aligned c-local-controls--show-on-hover"
    role="toolbar"
    aria-label="Image controls"
>
    <imagery-view-menu-switcher
        :icon-class="'icon-brightness'"
        :title="'Brightness and contrast'"
    >
        <filter-settings @filterChanged="updateFilterValues" />
    </imagery-view-menu-switcher>

    <imagery-view-menu-switcher
        v-if="layers.length"
        :icon-class="'icon-layers'"
        :title="'Layers'"
    >
        <layer-settings
            :layers="layers"
            @toggleLayerVisibility="toggleLayerVisibility"
        />
    </imagery-view-menu-switcher>

    <zoom-settings
        class="--hide-if-less-than-220"
        :pan-zoom-locked="panZoomLocked"
        :zoom-factor="zoomFactor"
        @zoomOut="zoomOut"
        @zoomIn="zoomIn"
        @toggleZoomLock="toggleZoomLock"
        @handleResetImage="handleResetImage"
    />

    <imagery-view-menu-switcher
        class="--show-if-less-than-220"
        :icon-class="'icon-magnify'"
        :title="'Zoom settings'"
    >
        <zoom-settings
            :pan-zoom-locked="panZoomLocked"
            :class="'c-control-menu c-menu--has-close-btn'"
            :zoom-factor="zoomFactor"
            :is-menu="true"
            @zoomOut="zoomOut"
            @zoomIn="zoomIn"
            @toggleZoomLock="toggleZoomLock"
            @handleResetImage="handleResetImage"
        />
    </imagery-view-menu-switcher>
</div>
</template>

<script>
import _ from 'lodash';

import FilterSettings from "./FilterSettings.vue";
import LayerSettings from "./LayerSettings.vue";
import ZoomSettings from "./ZoomSettings.vue";
import ImageryViewMenuSwitcher from "./ImageryViewMenuSwitcher.vue";

const DEFAULT_FILTER_VALUES = {
    brightness: '100',
    contrast: '100'
};

const ZOOM_LIMITS_MAX_DEFAULT = 20;
const ZOOM_LIMITS_MIN_DEFAULT = 1;
const ZOOM_STEP = 1;
const ZOOM_WHEEL_SENSITIVITY_REDUCTION = 0.01;

export default {
    components: {
        FilterSettings,
        LayerSettings,
        ImageryViewMenuSwitcher,
        ZoomSettings
    },
    inject: ['openmct', 'domainObject'],
    props: {
        layers: {
            type: Array,
            required: true
        },
        zoomFactor: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            default: () => {
                return '';
            }
        }
    },
    data() {
        return {
            altPressed: false,
            shiftPressed: false,
            metaPressed: false,
            panZoomLocked: false,
            wheelZooming: false,
            filters: {
                brightness: 100,
                contrast: 100
            }
        };
    },
    computed: {
        cursorStates() {
            const isPannable = this.altPressed && this.zoomFactor > 1;
            const showCursorZoomIn = this.metaPressed && !this.shiftPressed;
            const showCursorZoomOut = this.metaPressed && this.shiftPressed;
            const modifierKeyPressed = Boolean(this.metaPressed || this.shiftPressed || this.altPressed);

            return {
                isPannable,
                showCursorZoomIn,
                showCursorZoomOut,
                modifierKeyPressed
            };
        }
    },
    watch: {
        imageUrl(newUrl, oldUrl) {
            // reset image pan/zoom if newUrl only if not locked
            if (newUrl && !this.panZoomLocked) {
                this.$emit('resetImage');
            }
        },
        cursorStates(states) {
            this.$emit('cursorsUpdated', states);
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.clearWheelZoom = _.debounce(this.clearWheelZoom, 600);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    },
    methods: {
        handleResetImage() {
            this.$emit('resetImage');
        },
        handleUpdatePanZoom(options) {
            this.$emit('panZoomUpdated', options);
        },
        toggleZoomLock() {
            this.panZoomLocked = !this.panZoomLocked;
        },
        notifyFiltersChanged() {
            this.$emit('filtersUpdated', this.filters);
        },
        handleResetFilters() {
            this.filters = {...DEFAULT_FILTER_VALUES};
            this.notifyFiltersChanged();
        },
        limitZoomRange(factor) {
            return Math.min(Math.max(ZOOM_LIMITS_MIN_DEFAULT, factor), ZOOM_LIMITS_MAX_DEFAULT);
        },
        // used to increment the zoom without knowledge of current level
        processZoom(increment, userCoordX, userCoordY) {
            const newFactor = this.limitZoomRange(this.zoomFactor + increment);
            this.zoomImage(newFactor, userCoordX, userCoordY);
        },
        zoomImage(newScaleFactor, screenClientX, screenClientY) {
            if (!(newScaleFactor || Number.isInteger(newScaleFactor))) {
                console.error('Scale factor provided is invalid');

                return;
            }

            if (newScaleFactor > ZOOM_LIMITS_MAX_DEFAULT) {
                newScaleFactor = ZOOM_LIMITS_MAX_DEFAULT;
            }

            if (newScaleFactor <= 0 || newScaleFactor <= ZOOM_LIMITS_MIN_DEFAULT) {
                return this.handleResetImage();
            }

            this.handleUpdatePanZoom({
                newScaleFactor,
                screenClientX,
                screenClientY
            });
        },
        wheelZoom(e) {
            // only use x,y coordinates on scrolling in
            if (this.wheelZooming === false && e.deltaY > 0) {
                this.wheelZooming = true;
                // grab first x,y coordinates
                this.processZoom(e.deltaY * ZOOM_WHEEL_SENSITIVITY_REDUCTION, e.clientX, e.clientY);
            } else {
                // ignore subsequent event x,y so scroll drift doesn't occur
                this.processZoom(e.deltaY * ZOOM_WHEEL_SENSITIVITY_REDUCTION);
            }

            // debounced method that will only fire after the scroll series is complete
            this.clearWheelZoom();
        },
        /* debounced method so that wheelZooming state will
        ** remain true through a zoom event series
        */
        clearWheelZoom() {
            this.wheelZooming = false;
        },
        handleKeyDown(event) {
            if (event.key === 'Alt') {
                this.altPressed = true;
            }

            if (event.metaKey) {
                this.metaPressed = true;
            }

            if (event.shiftKey) {
                this.shiftPressed = true;
            }
        },
        handleKeyUp(event) {
            if (event.key === 'Alt') {
                this.altPressed = false;
            }

            this.shiftPressed = false;
            if (!event.metaKey) {
                this.metaPressed = false;
            }
        },
        zoomIn() {
            this.processZoom(ZOOM_STEP);
        },
        zoomOut() {
            this.processZoom(-ZOOM_STEP);
        },
        // attached to onClick listener in ImageryView
        handlePanZoomClick(e) {
            if (this.altPressed) {
                return this.$emit('startPan', e);
            }

            if (!(this.metaPressed && e.button === 0)) {
                return;
            }

            const newScaleFactor = this.zoomFactor + (this.shiftPressed ? -ZOOM_STEP : ZOOM_STEP);
            this.zoomImage(newScaleFactor, e.clientX, e.clientY);
        },
        toggleLayerVisibility(index) {
            this.$emit('toggleLayerVisibility', index);
        },
        updateFilterValues(filters) {
            this.filters = filters;
            this.notifyFiltersChanged();
        }
    }
};
</script>
