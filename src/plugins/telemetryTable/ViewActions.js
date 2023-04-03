/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const exportCSV = {
    name: 'Export Table Data',
    key: 'export-csv-all',
    description: "Export this view's data",
    cssClass: 'icon-download labeled',
    invoke: (objectPath, view) => {
        view.getViewContext().exportAllDataAsCSV();
    },
    group: 'view'
};

const exportMarkedDataAsCSV = {
    name: 'Export Marked Rows',
    key: 'export-csv-marked',
    description: "Export marked rows as CSV",
    cssClass: 'icon-download labeled',
    invoke: (objectPath, view) => {
        view.getViewContext().exportMarkedDataAsCSV();
    },
    group: 'view'
};

const unmarkAllRows = {
    name: 'Unmark All Rows',
    key: 'unmark-all-rows',
    description: 'Unmark all rows',
    cssClass: 'icon-x labeled',
    invoke: (objectPath, view) => {
        view.getViewContext().unmarkAllRows();
    },
    showInStatusBar: true,
    group: 'view'
};

const pause = {
    name: 'Pause',
    key: 'pause-data',
    description: 'Pause real-time data flow',
    cssClass: 'icon-pause',
    invoke: (objectPath, view) => {
        view.getViewContext().togglePauseByButton();
    },
    showInStatusBar: true,
    group: 'view'
};

const play = {
    name: 'Play',
    key: 'play-data',
    description: 'Continue real-time data flow',
    cssClass: 'c-button pause-play is-paused',
    invoke: (objectPath, view) => {
        view.getViewContext().togglePauseByButton();
    },
    showInStatusBar: true,
    group: 'view'
};

const expandColumns = {
    name: 'Expand Columns',
    key: 'expand-columns',
    description: "Increase column widths to fit currently available data.",
    cssClass: 'icon-arrows-right-left labeled',
    invoke: (objectPath, view) => {
        view.getViewContext().expandColumns();
    },
    showInStatusBar: true,
    group: 'view'
};

const autosizeColumns = {
    name: 'Autosize Columns',
    key: 'autosize-columns',
    description: "Automatically size columns to fit the table into the available space.",
    cssClass: 'icon-expand labeled',
    invoke: (objectPath, view) => {
        view.getViewContext().autosizeColumns();
    },
    showInStatusBar: true,
    group: 'view'
};

const viewActions = [
    exportCSV,
    exportMarkedDataAsCSV,
    unmarkAllRows,
    pause,
    play,
    expandColumns,
    autosizeColumns
];

viewActions.forEach(action => {
    action.appliesTo = (objectPath, view = {}) => {
        const viewContext = view.getViewContext && view.getViewContext();
        if (!viewContext) {
            return false;
        }

        return viewContext.type === 'telemetry-table';
    };
});

export default viewActions;
