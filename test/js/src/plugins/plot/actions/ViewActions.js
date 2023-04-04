/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import {isPlotView} from "@/plugins/plot/actions/utils";

const exportPNG = {
    name: 'Export as PNG',
    key: 'export-as-png',
    description: 'Export This View\'s Data as PNG',
    cssClass: 'icon-download',
    group: 'view',
    invoke(objectPath, view) {
        view.getViewContext().exportPNG();
    }
};

const exportJPG = {
    name: 'Export as JPG',
    key: 'export-as-jpg',
    description: 'Export This View\'s Data as JPG',
    cssClass: 'icon-download',
    group: 'view',
    invoke(objectPath, view) {
        view.getViewContext().exportJPG();
    }
};

const viewActions = [
    exportPNG,
    exportJPG
];

viewActions.forEach(action => {
    action.appliesTo = (objectPath, view = {}) => {
        return isPlotView(view);
    };
});

export default viewActions;
