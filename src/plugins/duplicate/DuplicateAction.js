/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
import DuplicateTask from './DuplicateTask';

export default class DuplicateAction {
    constructor(openmct) {
        this.name = 'Duplicate';
        this.key = 'duplicate';
        this.description = 'Duplicate this object.';
        this.cssClass = "icon-duplicate";
        this.group = "action";
        this.priority = 7;

        this.openmct = openmct;
        this.transaction = null;
    }

    invoke(objectPath) {
        this.object = objectPath[0];
        this.parent = objectPath[1];

        this.showForm(this.object, this.parent);
    }

    inNavigationPath() {
        return this.openmct.router.path
            .some(objectInPath => this.openmct.objects.areIdsEqual(objectInPath.identifier, this.object.identifier));
    }

    async onSave(changes) {
        this.startTransaction();

        let inNavigationPath = this.inNavigationPath();
        if (inNavigationPath && this.openmct.editor.isEditing()) {
            this.openmct.editor.save();
        }

        let duplicationTask = new DuplicateTask(this.openmct);
        if (changes.name && (changes.name !== this.object.name)) {
            duplicationTask.changeName(changes.name);
        }

        const parentDomainObjectpath = changes.location || [this.parent];
        const parent = parentDomainObjectpath[0];

        await duplicationTask.duplicate(this.object, parent);

        return this.saveTransaction();
    }

    showForm(domainObject, parentDomainObject) {
        const formStructure = {
            title: "Duplicate Item",
            sections: [
                {
                    rows: [
                        {
                            key: "name",
                            control: "textfield",
                            name: "Title",
                            pattern: "\\S+",
                            required: true,
                            cssClass: "l-input-lg",
                            value: domainObject.name
                        },
                        {
                            name: "Location",
                            cssClass: "grows",
                            control: "locator",
                            required: true,
                            parent: parentDomainObject,
                            validate: this.validate(parentDomainObject),
                            key: 'location'
                        }
                    ]
                }
            ]
        };

        this.openmct.forms.showForm(formStructure)
            .then(this.onSave.bind(this));
    }

    validate(currentParent) {
        return (data) => {
            const parentCandidate = data.value[0];

            let currentParentKeystring = this.openmct.objects.makeKeyString(currentParent.identifier);
            let parentCandidateKeystring = this.openmct.objects.makeKeyString(parentCandidate.identifier);
            let objectKeystring = this.openmct.objects.makeKeyString(this.object.identifier);

            if (!this.openmct.objects.isPersistable(parentCandidate.identifier)) {
                return false;
            }

            if (!parentCandidateKeystring || !currentParentKeystring) {
                return false;
            }

            if (parentCandidateKeystring === objectKeystring) {
                return false;
            }

            const parentCandidateComposition = parentCandidate.composition;
            if (parentCandidateComposition && parentCandidateComposition.indexOf(objectKeystring) !== -1) {
                return false;
            }

            return parentCandidate && this.openmct.composition.checkPolicy(parentCandidate, this.object);
        };
    }

    appliesTo(objectPath) {
        const parent = objectPath[1];
        const parentType = parent && this.openmct.types.get(parent.type);
        const child = objectPath[0];
        const childType = child && this.openmct.types.get(child.type);
        const locked = child.locked ? child.locked : parent && parent.locked;
        const isPersistable = this.openmct.objects.isPersistable(child.identifier);

        if (locked || !isPersistable) {
            return false;
        }

        return childType
            && childType.definition.creatable
            && parentType
            && parentType.definition.creatable
            && Array.isArray(parent.composition);
    }

    startTransaction() {
        if (!this.openmct.objects.isTransactionActive()) {
            this.transaction = this.openmct.objects.startTransaction();
        }
    }

    async saveTransaction() {
        if (!this.transaction) {
            return;
        }

        await this.transaction.commit();
        this.openmct.objects.endTransaction();
        this.transaction = null;
    }
}
