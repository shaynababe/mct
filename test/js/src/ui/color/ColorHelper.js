/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


export const COLOR_PALETTE = [
    [0x43, 0xB0, 0xFF],
    [0xF0, 0x60, 0x00],
    [0x00, 0x70, 0x40],
    [0xFB, 0x49, 0x49],
    [0xC8, 0x00, 0xCF],
    [0x55, 0x77, 0xF2],
    [0xFF, 0xA6, 0x3D],
    [0x05, 0xA3, 0x00],
    [0xF0, 0x00, 0x6C],
    [0xAC, 0x54, 0xAE],
    [0x23, 0xA9, 0xDB],
    [0xC7, 0xBE, 0x52],
    [0x5A, 0xBD, 0x56],
    [0xAD, 0x50, 0x72],
    [0x94, 0x25, 0xEA],
    [0x21, 0x87, 0x82],
    [0x8F, 0x6E, 0x47],
    [0xf0, 0x59, 0xcb],
    [0x34, 0xB6, 0x7D],
    [0x7F, 0x52, 0xFF],
    [0x46, 0xC7, 0xC0],
    [0xA1, 0x8C, 0x1C],
    [0x95, 0xB1, 0x26],
    [0xFF, 0x84, 0x9E],
    [0xB7, 0x79, 0xE7],
    [0x8C, 0xC9, 0xFD],
    [0xDB, 0xAA, 0x6E],
    [0x93, 0xB5, 0x77],
    [0xFF, 0xBC, 0xDA],
    [0xD3, 0xB6, 0xDE]
];

export function isDefaultColor(color) {
    const a = color.asIntegerArray();

    return COLOR_PALETTE.some(function (b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    });
}