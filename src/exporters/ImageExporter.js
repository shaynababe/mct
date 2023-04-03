/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
 * Class defining an image exporter for JPG/PNG output.
 * Originally created by hudsonfoo on 09/02/16
 */

function replaceDotsWithUnderscores(filename) {
    const regex = /\./gi;

    return filename.replace(regex, '_');
}

import {saveAs} from 'saveAs';
import html2canvas from 'html2canvas';
import { v4 as uuid } from 'uuid';

class ImageExporter {
    constructor(openmct) {
        this.openmct = openmct;
    }
    /**
        * Converts an HTML element into a PNG or JPG Blob.
        * @private
        * @param {node} element that will be converted to an image
        * @param {object} options Image options.
        * @returns {promise}
        */
    renderElement(element, { imageType, className, thumbnailSize }) {
        const self = this;
        const overlays = this.openmct.overlays;
        const dialog = overlays.dialog({
            iconClass: 'info',
            message: 'Capturing image, please wait...',
            buttons: [
                {
                    label: 'Cancel',
                    emphasis: true,
                    callback: function () {
                        dialog.dismiss();
                    }
                }
            ]
        });

        let mimeType = 'image/png';
        if (imageType === 'jpg') {
            mimeType = 'image/jpeg';
        }

        let exportId = undefined;
        let oldId = undefined;
        if (className) {
            const newUUID = uuid();
            exportId = `$export-element-${newUUID}`;
            oldId = element.id;
            element.id = exportId;
        }

        return html2canvas(element, {
            useCORS: true,
            allowTaint: true,
            logging: false,
            onclone: function (document) {
                if (className) {
                    const clonedElement = document.getElementById(exportId);
                    clonedElement.classList.add(className);
                }

                element.id = oldId;
            },
            removeContainer: true // Set to false to debug what html2canvas renders
        }).then(canvas => {
            dialog.dismiss();

            return new Promise(function (resolve, reject) {
                if (thumbnailSize) {
                    const thumbnail = self.getThumbnail(canvas, mimeType, thumbnailSize);

                    return canvas.toBlob(blob => resolve({
                        blob,
                        thumbnail
                    }), mimeType);
                }

                return canvas.toBlob(blob => resolve({ blob }), mimeType);
            });
        }).catch(error => {
            dialog.dismiss();

            console.error('error capturing image', error);
            const errorDialog = overlays.dialog({
                iconClass: 'error',
                message: 'Image was not captured successfully!',
                buttons: [
                    {
                        label: "OK",
                        emphasis: true,
                        callback: function () {
                            errorDialog.dismiss();
                        }
                    }
                ]
            });
        });
    }

    getThumbnail(canvas, mimeType, size) {
        const thumbnailCanvas = document.createElement('canvas');
        thumbnailCanvas.setAttribute('width', size.width);
        thumbnailCanvas.setAttribute('height', size.height);
        const ctx = thumbnailCanvas.getContext('2d');
        ctx.globalCompositeOperation = "copy";
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, size.width, size.height);

        return thumbnailCanvas.toDataURL(mimeType);
    }

    /**
     * Takes a screenshot of a DOM node and exports to JPG.
     * @param {node} element to be exported
     * @param {string} filename the exported image
     * @param {string} className to be added to element before capturing (optional)
     * @returns {promise}
     */
    async exportJPG(element, filename, className) {
        const processedFilename = replaceDotsWithUnderscores(filename);

        const img = await this.renderElement(element, {
            imageType: 'jpg',
            className
        });
        saveAs(img.blob, processedFilename);
    }

    /**
     * Takes a screenshot of a DOM node and exports to PNG.
     * @param {node} element to be exported
     * @param {string} filename the exported image
     * @param {string} className to be added to element before capturing (optional)
     * @returns {promise}
     */
    async exportPNG(element, filename, className) {
        const processedFilename = replaceDotsWithUnderscores(filename);

        const img = await this.renderElement(element, {
            imageType: 'png',
            className
        });
        saveAs(img.blob, processedFilename);
    }

    /**
     * Takes a screenshot of a DOM node in PNG format.
     * @param {node} element to be exported
     * @param {string} filename the exported image
     * @returns {promise}
     */

    exportPNGtoSRC(element, options) {
        return this.renderElement(element, {
            imageType: 'png',
            ...options
        });
    }
}

export default ImageExporter;

