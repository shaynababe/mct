/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import CSV from 'comma-separated-values';
import {saveAs} from 'saveAs';

class CSVExporter {
    export(rows, options) {
        let headers = (options && options.headers)
            || (Object.keys((rows[0] || {})).sort());
        let filename = (options && options.filename) || "export.csv";
        let csvText = new CSV(rows, { header: headers }).encode();
        let blob = new Blob([csvText], { type: "text/csv" });
        saveAs(blob, filename);
    }
}

export default CSVExporter;
