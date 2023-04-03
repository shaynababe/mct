/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { createOpenMct, resetApplicationState } from "utils/testing";
import WebPagePlugin from "./plugin";

function getView(openmct, domainObj, objectPath) {
    const applicableViews = openmct.objectViews.get(domainObj, objectPath);
    const webpageView = applicableViews.find((viewProvider) => viewProvider.key === 'webPage');

    return webpageView.view(domainObj);
}

function destroyView(view) {
    return view.destroy();
}

describe("The web page plugin", function () {
    let mockDomainObject;
    let mockDomainObjectPath;
    let openmct;
    let element;
    let child;
    let view;

    beforeEach((done) => {
        mockDomainObjectPath = [
            {
                name: 'mock webpage',
                type: 'webpage',
                identifier: {
                    key: 'mock-webpage',
                    namespace: ''
                }
            }
        ];

        mockDomainObject = {
            displayFormat: "",
            name: "Unnamed WebPage",
            type: "webPage",
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
        openmct.install(new WebPagePlugin());

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

    describe('the view', () => {
        beforeEach(() => {
            view = getView(openmct, mockDomainObject, mockDomainObjectPath);
            view.show(child, true);
        });

        it('provides a view', () => {
            expect(view).toBeDefined();
        });
    });

});
