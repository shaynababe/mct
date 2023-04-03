/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import ImageExporter from './ImageExporter';
import { createOpenMct, resetApplicationState } from '../utils/testing';

describe('The Image Exporter', () => {
    let openmct;
    let imageExporter;

    beforeEach(() => {
        openmct = createOpenMct();
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe("basic instatation", () => {
        it("can be instatiated", () => {
            imageExporter = new ImageExporter(openmct);

            expect(imageExporter).not.toEqual(null);
        });
        it("can render an element to a blob", async () => {
            const mockHeadElement = document.createElement("h1");
            const mockTextNode = document.createTextNode('foo bar');
            mockHeadElement.appendChild(mockTextNode);
            document.body.appendChild(mockHeadElement);
            imageExporter = new ImageExporter(openmct);
            const returnedBlob = await imageExporter.renderElement(document.body, {
                imageType: 'png'
            });
            expect(returnedBlob).not.toEqual(null);
            expect(returnedBlob.blob).not.toEqual(null);
            expect(returnedBlob.blob).toBeInstanceOf(Blob);
        });
    });
});
