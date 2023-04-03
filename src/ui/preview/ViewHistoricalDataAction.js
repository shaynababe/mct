/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import PreviewAction from './PreviewAction';

export default class ViewHistoricalDataAction extends PreviewAction {
    constructor(openmct) {
        super(openmct);

        this.name = 'View Historical Data';
        this.key = 'viewHistoricalData';
        this.description = 'View Historical Data in a Table or Plot';
        this.cssClass = 'icon-eye-open';
        this.hideInDefaultMenu = true;
    }

    appliesTo(objectPath, view = {}) {
        let viewContext = view.getViewContext && view.getViewContext();

        return objectPath.length
            && viewContext
            && viewContext.row
            && viewContext.row.viewHistoricalData;
    }
}
