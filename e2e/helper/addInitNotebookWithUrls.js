/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

// This should be used to install the re-instal default Notebook plugin with a simple url whitelist.
// e.g.
// await page.addInitScript({ path: path.join(__dirname, 'addInitNotebookWithUrls.js') });
const NOTEBOOK_NAME = 'Notebook';
const URL_WHITELIST = ['google.com'];

document.addEventListener('DOMContentLoaded', () => {
    const openmct = window.openmct;
    openmct.install(openmct.plugins.Notebook(NOTEBOOK_NAME, URL_WHITELIST));
});
