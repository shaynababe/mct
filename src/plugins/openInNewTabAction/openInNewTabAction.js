/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import objectPathToUrl from '/src/tools/url';
export default class OpenInNewTab {
    constructor(openmct) {
        this.name = 'Open In New Tab';
        this.key = 'newTab';
        this.description = 'Open in a new browser tab';
        this.group = "windowing";
        this.priority = 10;
        this.cssClass = "icon-new-window";

        this._openmct = openmct;
    }
    invoke(objectPath, urlParams = undefined) {
        let url = objectPathToUrl(this._openmct, objectPath, urlParams);
        window.open(url);
    }
}
