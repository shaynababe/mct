/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import Compass from './Compass.vue';
import Vue from 'vue';

const COMPASS_ROSE_CLASS = '.c-direction-rose';
const COMPASS_HUD_CLASS = '.c-compass__hud';

describe("The Compass component", () => {
    let app;
    let instance;

    beforeEach(() => {
        let imageDatum = {
            heading: 100,
            roll: 90,
            pitch: 90,
            cameraTilt: 100,
            cameraAzimuth: 90,
            sunAngle: 30,
            transformations: {
                translateX: 0,
                translateY: 18,
                rotation: 0,
                scale: 0.3,
                cameraAngleOfView: 70
            }
        };
        let propsData = {
            naturalAspectRatio: 0.9,
            image: imageDatum,
            sizedImageDimensions: {
                width: 100,
                height: 100
            }
        };

        app = new Vue({
            components: { Compass },
            data() {
                return propsData;
            },
            template: `<Compass
                :image="image"
                :natural-aspect-ratio="naturalAspectRatio"
                :sized-image-dimensions="sizedImageDimensions"
            />`
        });
        instance = app.$mount();
    });

    afterAll(() => {
        app.$destroy();
    });

    describe("when a heading value and cameraAngleOfView exists on the image", () => {

        it("should display a compass rose", () => {
            let compassRoseElement = instance.$el.querySelector(COMPASS_ROSE_CLASS
            );

            expect(compassRoseElement).toBeDefined();
        });

        it("should display a compass HUD", () => {
            let compassHUDElement = instance.$el.querySelector(COMPASS_HUD_CLASS);

            expect(compassHUDElement).toBeDefined();
        });

    });

});
