/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import {saveAs} from 'saveAs';

class JSONExporter {
    export(obj, options) {
        let filename = (options && options.filename) || "test-export.json";
        let jsonText = JSON.stringify(obj);
        let blob = new Blob([jsonText], {type: "application/json"});
        saveAs(blob, filename);
    }
}

export default JSONExporter;
