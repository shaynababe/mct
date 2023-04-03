/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define(function () {
    function DisplayLayoutType() {
        return {
            name: "Display Layout",
            creatable: true,
            description: 'Assemble other objects and components together into a reusable screen layout. Simply drag in the objects you want, position and size them. Save your design and view or edit it at any time.',
            cssClass: 'icon-layout',
            initialize(domainObject) {
                domainObject.composition = [];
                domainObject.configuration = {
                    items: [],
                    layoutGrid: [10, 10]
                };
            },
            form: [
                {
                    name: "Horizontal grid (px)",
                    control: "numberfield",
                    cssClass: "l-input-sm l-numeric",
                    property: [
                        "configuration",
                        "layoutGrid",
                        0
                    ],
                    required: true
                },
                {
                    name: "Vertical grid (px)",
                    control: "numberfield",
                    cssClass: "l-input-sm l-numeric",
                    property: [
                        "configuration",
                        "layoutGrid",
                        1
                    ],
                    required: true
                },
                {
                    name: "Horizontal size (px)",
                    control: "numberfield",
                    cssClass: "l-input-sm l-numeric",
                    property: [
                        "configuration",
                        "layoutDimensions",
                        0
                    ],
                    required: false
                },
                {
                    name: "Vertical size (px)",
                    control: "numberfield",
                    cssClass: "l-input-sm l-numeric",
                    property: [
                        "configuration",
                        "layoutDimensions",
                        1
                    ],
                    required: false
                }
            ]
        };
    }

    return DisplayLayoutType;
});
