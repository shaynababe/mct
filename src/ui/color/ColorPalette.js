/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
     * A color palette stores a set of colors and allows for different
     * methods of color allocation.
     *
     * @constructor
     */
import { isDefaultColor, COLOR_PALETTE } from './ColorHelper';
import Color from './Color';

/**
 * A color palette stores a set of colors and allows for different
 * methods of color allocation.
 *
 * @constructor
 */
function ColorPalette() {
    const allColors = this.allColors = COLOR_PALETTE.map(function (color) {
        return new Color(color);
    });
    this.colorGroups = [[], [], []];
    for (let i = 0; i < allColors.length; i++) {
        this.colorGroups[i % 3].push(allColors[i]);
    }

    this.reset();
}

/**
 *
 */
ColorPalette.prototype.groups = function () {
    return this.colorGroups;
};

ColorPalette.prototype.reset = function () {
    this.availableColors = this.allColors.slice();
};

ColorPalette.prototype.remove = function (color) {
    this.availableColors = this.availableColors.filter(function (c) {
        return !c.equalTo(color);
    });
};

ColorPalette.prototype.return = function (color) {
    if (isDefaultColor(color)) {
        this.availableColors.unshift(color);
    }
};

ColorPalette.prototype.getByHexString = function (hexString) {
    const color = Color.fromHexString(hexString);

    return color;
};

/**
 * @returns {Color} the next unused color in the palette.  If all colors
 * have been allocated, it will wrap around.
 */
ColorPalette.prototype.getNextColor = function () {
    if (!this.availableColors.length) {
        console.warn('Color Palette empty, reusing colors!');
        this.reset();
    }

    return this.availableColors.shift();
};

export default ColorPalette;
