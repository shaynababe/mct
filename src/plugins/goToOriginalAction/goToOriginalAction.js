/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class GoToOriginalAction {
    constructor(openmct) {
        this.name = 'Go To Original';
        this.key = 'goToOriginal';
        this.description = 'Go to the original unlinked instance of this object';
        this.group = 'action';
        this.priority = 4;

        this._openmct = openmct;
    }
    invoke(objectPath) {
        this._openmct.objects.getOriginalPath(objectPath[0].identifier)
            .then((originalPath) => {
                let url = '#/browse/' + originalPath
                    .map(function (o) {
                        return o && this._openmct.objects.makeKeyString(o.identifier);
                    }.bind(this))
                    .reverse()
                    .slice(1)
                    .join('/');

                this._openmct.router.navigate(url);
            });
    }
    appliesTo(objectPath) {
        if (this._openmct.editor.isEditing()) {
            return false;
        }

        let parentKeystring = objectPath[1] && this._openmct.objects.makeKeyString(objectPath[1].identifier);

        if (!parentKeystring) {
            return false;
        }

        return (parentKeystring !== objectPath[0].location);
    }
}
