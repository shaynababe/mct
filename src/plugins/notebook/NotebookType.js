/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import { IMAGE_MIGRATION_VER } from '../notebook/utils/notebook-migration';

export default class NotebookType {
    constructor(name, description, icon) {
        this.name = name;
        this.description = description;
        this.cssClass = icon;
        this.creatable = true;
        this.form = [
            {
                key: 'defaultSort',
                name: 'Entry Sorting',
                control: 'select',
                options: [
                    {
                        name: 'Newest First',
                        value: "newest"
                    },
                    {
                        name: 'Oldest First',
                        value: "oldest"
                    }
                ],
                cssClass: 'l-inline',
                property: [
                    "configuration",
                    "defaultSort"
                ]
            },
            {
                key: 'sectionTitle',
                name: 'Section Title',
                control: 'textfield',
                cssClass: 'l-inline',
                required: true,
                property: [
                    "configuration",
                    "sectionTitle"
                ]
            },
            {
                key: 'pageTitle',
                name: 'Page Title',
                control: 'textfield',
                cssClass: 'l-inline',
                required: true,
                property: [
                    "configuration",
                    "pageTitle"
                ]
            }
        ];
    }

    initialize(domainObject) {
        domainObject.configuration = {
            defaultSort: 'oldest',
            entries: {},
            imageMigrationVer: IMAGE_MIGRATION_VER,
            pageTitle: 'Page',
            sections: [],
            sectionTitle: 'Section',
            type: 'General'
        };
    }
}
