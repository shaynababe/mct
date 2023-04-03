/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class LinkAction {
    constructor(openmct) {
        this.name = 'Create Link';
        this.key = 'link';
        this.description = 'Create Link to object in another location.';
        this.cssClass = "icon-link";
        this.group = "action";
        this.priority = 7;

        this.openmct = openmct;
        this.transaction = null;
    }

    appliesTo(objectPath) {
        return true; // link away!
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

    onSave(changes) {
        this.startTransaction();

        const inNavigationPath = this.inNavigationPath();
        if (inNavigationPath && this.openmct.editor.isEditing()) {
            this.openmct.editor.save();
        }

        const parentDomainObjectpath = changes.location || [this.parent];
        const parent = parentDomainObjectpath[0];

        this.linkInNewParent(this.object, parent);

        return this.saveTransaction();
    }

    linkInNewParent(child, newParent) {
        let compositionCollection = this.openmct.composition.get(newParent);

        compositionCollection.add(child);
    }

    showForm(domainObject, parentDomainObject) {
        const formStructure = {
            title: `Link "${domainObject.name}" to a New Location`,
            sections: [
                {
                    rows: [
                        {
                            name: "location",
                            control: "locator",
                            parent: parentDomainObject,
                            required: true,
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

            // default current parent to ROOT, if it's null, then it's a root level item
            if (!currentParent) {
                currentParent = {
                    identifier: {
                        key: 'ROOT',
                        namespace: ''
                    }
                };
            }

            const parentCandidatePath = data.value;
            const parentCandidate = parentCandidatePath[0];
            const objectKeystring = this.openmct.objects.makeKeyString(this.object.identifier);

            if (!this.openmct.objects.isPersistable(parentCandidate.identifier)) {
                return false;
            }

            // check if moving to same place
            if (this.openmct.objects.areIdsEqual(parentCandidate.identifier, currentParent.identifier)) {
                return false;
            }

            // check if moving to a child
            if (parentCandidatePath.some(candidatePath => {
                return this.openmct.objects.areIdsEqual(candidatePath.identifier, this.object.identifier);
            })) {
                return false;
            }

            const parentCandidateComposition = parentCandidate.composition;
            if (parentCandidateComposition && parentCandidateComposition.indexOf(objectKeystring) !== -1) {
                return false;
            }

            return parentCandidate && this.openmct.composition.checkPolicy(parentCandidate, this.object);
        };
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
