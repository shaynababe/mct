/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const expandColumns = {
    name: 'Expand Columns',
    key: 'lad-expand-columns',
    description: "Increase column widths to fit currently available data.",
    cssClass: 'icon-arrows-right-left labeled',
    invoke: (objectPath, view) => {
        view.getViewContext().toggleFixedLayout();
    },
    showInStatusBar: true,
    group: 'view'
};

const autosizeColumns = {
    name: 'Autosize Columns',
    key: 'lad-autosize-columns',
    description: "Automatically size columns to fit the table into the available space.",
    cssClass: 'icon-expand labeled',
    invoke: (objectPath, view) => {
        view.getViewContext().toggleFixedLayout();
    },
    showInStatusBar: true,
    group: 'view'
};

const viewActions = [
    expandColumns,
    autosizeColumns
];

viewActions.forEach(action => {
    action.appliesTo = (objectPath, view = {}) => {
        const viewContext = view.getViewContext && view.getViewContext();
        if (!viewContext) {
            return false;
        }

        return viewContext.type === 'lad-table';
    };
});

export default viewActions;
