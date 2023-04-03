/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
     * A representation of a color that allows conversions between different
     * formats.
     *
     * @constructor
     */
/**
 * A representation of a color that allows conversions between different
 * formats.
 *
 * @constructor
 */
function Color(integerArray) {
    this.integerArray = integerArray;
}

Color.fromHexString = function (hexString) {
    if (!/#([0-9a-fA-F]{2}){2}/.test(hexString)) {
        throw new Error(
            'Invalid input "'
            + hexString
            + '". Hex string must be in CSS format e.g. #00FF00'
        );
    }

    return new Color([
        parseInt(hexString.slice(1, 3), 16),
        parseInt(hexString.slice(3, 5), 16),
        parseInt(hexString.slice(5, 7), 16)
    ]);
};

/**
 * Return color as a three element array of RGB values, where each value
 * is a integer in the range of 0-255.
 *
 * @return {number[]} the color, as integer RGB values
 */
Color.prototype.asIntegerArray = function () {
    return this.integerArray.map(function (c) {
        return c;
    });
};

/**
 * Return color as a string using #-prefixed six-digit RGB hex notation
 * (e.g. #FF0000).  See http://www.w3.org/TR/css3-color/#rgb-color.
 *
 * @return {string} the color, as a style-friendly string
 */

Color.prototype.asHexString = function () {
    return '#' + this.integerArray.map(function (c) {
        return (c < 16 ? '0' : '') + c.toString(16);
    }).join('');
};

/**
 * Return color as a RGBA float array.
 *
 * This format is present specifically to support use with
 * WebGL, which expects colors of that form.
 *
 * @return {number[]} the color, as floating-point RGBA values
 */
Color.prototype.asRGBAArray = function () {
    return this.integerArray.map(function (c) {
        return c / 255.0;
    }).concat([1]);
};

Color.prototype.equalTo = function (otherColor) {
    return this.asHexString() === otherColor.asHexString();
};

export default Color;
