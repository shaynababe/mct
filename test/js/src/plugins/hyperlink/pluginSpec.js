/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import { createOpenMct, resetApplicationState } from "utils/testing";
import HyperlinkPlugin from "./plugin";

function getView(openmct, domainObj, objectPath) {
    const applicableViews = openmct.objectViews.get(domainObj, objectPath);
    const hyperLinkView = applicableViews.find((viewProvider) => viewProvider.key === 'hyperlink.view');

    return hyperLinkView.view(domainObj);
}

function destroyView(view) {
    return view.destroy();
}

describe("The controller for hyperlinks", function () {
    let mockDomainObject;
    let mockObjectPath;
    let openmct;
    let element;
    let child;
    let view;

    beforeEach((done) => {
        mockObjectPath = [
            {
                name: 'mock hyperlink',
                type: 'hyperlink',
                identifier: {
                    key: 'mock-hyperlink',
                    namespace: ''
                }
            }
        ];

        mockDomainObject = {
            displayFormat: "",
            linkTarget: "",
            name: "Unnamed HyperLink",
            type: "hyperlink",
            location: "f69c21ac-24ef-450c-8e2f-3d527087d285",
            modified: 1627483839783,
            url: "123",
            displayText: "123",
            persisted: 1627483839783,
            id: "3d9c243d-dffb-446b-8474-d9931a99d679",
            identifier: {
                namespace: "",
                key: "3d9c243d-dffb-446b-8474-d9931a99d679"
            }
        };

        openmct = createOpenMct();
        openmct.install(new HyperlinkPlugin());

        element = document.createElement('div');
        element.style.width = '640px';
        element.style.height = '480px';
        child = document.createElement('div');
        child.style.width = '640px';
        child.style.height = '480px';
        element.appendChild(child);

        openmct.on('start', done);
        openmct.startHeadless();

    });

    afterEach(() => {
        destroyView(view);

        return resetApplicationState(openmct);
    });
    it("knows when it should open a new tab", () => {
        mockDomainObject.displayFormat = "link";
        mockDomainObject.linkTarget = "_blank";

        view = getView(openmct, mockDomainObject, mockObjectPath);
        view.show(child, true);

        expect(element.querySelector('.c-hyperlink').target).toBe('_blank');
    });
    it("knows when it should open in the same tab", function () {
        mockDomainObject.displayFormat = "button";
        mockDomainObject.linkTarget = "_self";

        view = getView(openmct, mockDomainObject, mockObjectPath);
        view.show(child, true);

        expect(element.querySelector('.c-hyperlink').target).toBe('_self');
    });

    it("knows when it is a button", function () {
        mockDomainObject.displayFormat = "button";

        view = getView(openmct, mockDomainObject, mockObjectPath);
        view.show(child, true);

        expect(element.querySelector('.c-hyperlink--button')).toBeDefined();
    });
    it("knows when it is a link", function () {
        mockDomainObject.displayFormat = "link";

        view = getView(openmct, mockDomainObject, mockObjectPath);
        view.show(child, true);

        expect(element.querySelector('.c-hyperlink')).not.toHaveClass('c-hyperlink--button');
    });
});
