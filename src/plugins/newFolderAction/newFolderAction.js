/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import CreateAction from '@/plugins/formActions/CreateAction';

export default class NewFolderAction {
    constructor(openmct) {
        this.type = 'folder';
        this.name = 'Add New Folder';
        this.key = 'newFolder';
        this.description = 'Create a new folder';
        this.cssClass = 'icon-folder-new';
        this.group = "action";
        this.priority = 9;

        this._openmct = openmct;
    }

    invoke(objectPath) {
        const parentDomainObject = objectPath[0];
        const createAction = new CreateAction(this._openmct, this.type, parentDomainObject);
        createAction.invoke();
    }

    appliesTo(objectPath) {
        let domainObject = objectPath[0];
        let isPersistable = this._openmct.objects.isPersistable(domainObject.identifier);

        return domainObject.type === this.type && isPersistable;
    }
}
