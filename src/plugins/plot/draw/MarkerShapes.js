/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
     * @label string (required) display name of shape
     * @drawWebGL integer (unique, required) index provided to WebGL Fragment Shader
     * @drawC2D function (required) canvas2d draw function
     */
export const MARKER_SHAPES = {
    point: {
        label: 'Point',
        drawWebGL: 1,
        drawC2D: function (x, y, size) {
            const offset = size / 2;

            this.c2d.fillRect(x - offset, y - offset, size, size);
        }
    },
    circle: {
        label: 'Circle',
        drawWebGL: 2,
        drawC2D: function (x, y, size) {
            const radius = size / 2;

            this.c2d.beginPath();
            this.c2d.arc(x, y, radius, 0, 2 * Math.PI, false);
            this.c2d.closePath();
            this.c2d.fill();
        }
    },
    diamond: {
        label: 'Diamond',
        drawWebGL: 3,
        drawC2D: function (x, y, size) {
            const offset = size / 2;
            const top = [x, y + offset];
            const right = [x + offset, y];
            const bottom = [x, y - offset];
            const left = [x - offset, y];

            this.c2d.beginPath();
            this.c2d.moveTo(...top);
            this.c2d.lineTo(...right);
            this.c2d.lineTo(...bottom);
            this.c2d.lineTo(...left);
            this.c2d.closePath();
            this.c2d.fill();
        }
    },
    triangle: {
        label: 'Triangle',
        drawWebGL: 4,
        drawC2D: function (x, y, size) {
            const offset = size / 2;
            const v1 = [x, y - offset];
            const v2 = [x - offset, y + offset];
            const v3 = [x + offset, y + offset];

            this.c2d.beginPath();
            this.c2d.moveTo(...v1);
            this.c2d.lineTo(...v2);
            this.c2d.lineTo(...v3);
            this.c2d.closePath();
            this.c2d.fill();
        }
    }
};
