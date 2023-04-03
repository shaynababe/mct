/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

// This should be used to install the non-default Restricted Notebook plugin since it is not installed by default.
// e.g.
// await page.addInitScript({ path: path.join(__dirname, 'addInitRestrictedNotebook.js') });

document.addEventListener('DOMContentLoaded', () => {
    const openmct = window.openmct;
    openmct.install(openmct.plugins.RestrictedNotebook('CUSTOM_NAME'));
});
