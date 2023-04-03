/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import JSONExporter from '/src/exporters/JSONExporter.js';

import _ from 'lodash';
import { v4 as uuid } from 'uuid';

export default class ExportAsJSONAction {
    constructor(openmct) {
        this.openmct = openmct;

        this.name = 'Export as JSON';
        this.key = 'export.JSON';
        this.description = '';
        this.cssClass = "icon-export";
        this.group = "export";
        this.priority = 1;

        this.externalIdentifiers = [];
        this.tree = {};
        this.calls = 0;
        this.idMap = {};

        this.JSONExportService = new JSONExporter();
    }

    // Public
    /**
     *
     * @param {object} objectPath
     * @returns {boolean}
     */
    appliesTo(objectPath) {
        let domainObject = objectPath[0];

        return this._isCreatableAndPersistable(domainObject);
    }
    /**
     *
     * @param {object} objectpath
     */
    invoke(objectpath) {
        this.tree = {};
        const root = objectpath[0];
        this.root = JSON.parse(JSON.stringify(root));
        const rootId = this._getId(this.root);
        this.tree[rootId] = this.root;

        this._write(this.root);
    }
    /**
     * @private
     * @param {object} domainObject
     * @returns {string} A string representation of the given identifier, including namespace and key
     */
    _getId(domainObject) {
        return this.openmct.objects.makeKeyString(domainObject.identifier);
    }
    /**
     * @private
     * @param {object} domainObject
     * @returns {boolean}
     */
    _isCreatableAndPersistable(domainObject) {
        const type = this.openmct.types.get(domainObject.type);
        const isPersistable = this.openmct.objects.isPersistable(domainObject.identifier);

        return type && type.definition.creatable && isPersistable;
    }
    /**
     * @private
     * @param {object} child
     * @param {object} parent
     * @returns {boolean}
     */
    _isLinkedObject(child, parent) {
        if (child.location !== this._getId(parent)
            && !Object.keys(this.tree).includes(child.location)
            && this._getId(child) !== this._getId(this.root)
            || this.externalIdentifiers.includes(this._getId(child))) {

            return true;
        }

        return false;
    }
    /**
     * @private
     * @param {object} child
     * @param {object} parent
     * @returns {object}
     */
    _rewriteLink(child, parent) {
        this.externalIdentifiers.push(this._getId(child));
        const index = parent.composition.findIndex(id => {
            return _.isEqual(child.identifier, id);
        });
        const copyOfChild = JSON.parse(JSON.stringify(child));

        copyOfChild.identifier.key = uuid();
        const newIdString = this._getId(copyOfChild);
        const parentId = this._getId(parent);

        this.idMap[this._getId(child)] = newIdString;
        copyOfChild.location = parentId;
        parent.composition[index] = copyOfChild.identifier;
        this.tree[newIdString] = copyOfChild;
        this.tree[parentId].composition[index] = copyOfChild.identifier;

        return copyOfChild;
    }

    /**
     * @private
     * @param {object} child
     * @param {object} parent
     * @returns {object}
     */
    _rewriteLinkForReference(child, parent) {
        const childId = this._getId(child);
        this.externalIdentifiers.push(childId);
        const copyOfChild = JSON.parse(JSON.stringify(child));

        copyOfChild.identifier.key = uuid();
        const newIdString = this._getId(copyOfChild);
        const parentId = this._getId(parent);

        this.idMap[childId] = newIdString;
        copyOfChild.location = null;
        parent.configuration.objectStyles.conditionSetIdentifier = copyOfChild.identifier;
        this.tree[newIdString] = copyOfChild;
        this.tree[parentId].configuration.objectStyles.conditionSetIdentifier = copyOfChild.identifier;

        return copyOfChild;
    }
    /**
     * @private
     */
    _rewriteReferences() {
        let treeString = JSON.stringify(this.tree);
        Object.keys(this.idMap).forEach(function (oldId) {
            const newId = this.idMap[oldId];
            treeString = treeString.split(oldId).join(newId);
        }.bind(this));
        this.tree = JSON.parse(treeString);
    }
    /**
     * @private
     * @param {object} completedTree
     */
    _saveAs(completedTree) {
        this.JSONExportService.export(
            completedTree,
            { filename: this.root.name + '.json' }
        );
    }
    /**
     * @private
     * @returns {object}
     */
    _wrapTree() {
        return {
            "openmct": this.tree,
            "rootId": this._getId(this.root)
        };
    }

    /**
     * @private
     * @param {object} parent
     */
    _write(parent) {
        this.calls++;
        //conditional object styles are not saved on the composition, so we need to check for them
        let childObjectReferenceId = parent.configuration?.objectStyles?.conditionSetIdentifier;

        const composition = this.openmct.composition.get(parent);
        if (composition !== undefined) {
            composition.load()
                .then((children) => {
                    children.forEach((child, index) => {
                    // Only export if object is creatable
                        if (this._isCreatableAndPersistable(child)) {
                        // Prevents infinite export of self-contained objs
                            if (!Object.prototype.hasOwnProperty.call(this.tree, this._getId(child))) {
                            // If object is a link to something absent from
                            // tree, generate new id and treat as new object
                                if (this._isLinkedObject(child, parent)) {
                                    child = this._rewriteLink(child, parent);
                                } else {
                                    this.tree[this._getId(child)] = child;
                                }

                                this._write(child);
                            }
                        }
                    });
                    this._decrementCallsAndSave();
                });
        } else if (!childObjectReferenceId) {
            this._decrementCallsAndSave();
        }

        if (childObjectReferenceId) {
            this.openmct.objects.get(childObjectReferenceId)
                .then((child) => {
                    // Only export if object is creatable
                    if (this._isCreatableAndPersistable(child)) {
                        // Prevents infinite export of self-contained objs
                        if (!Object.prototype.hasOwnProperty.call(this.tree, this._getId(child))) {
                            // If object is a link to something absent from
                            // tree, generate new id and treat as new object
                            if (this._isLinkedObject(child, parent)) {
                                child = this._rewriteLinkForReference(child, parent);
                            } else {
                                this.tree[this._getId(child)] = child;
                            }

                            this._write(child);
                        }
                    }

                    this._decrementCallsAndSave();
                });
        }
    }

    _decrementCallsAndSave() {
        this.calls--;
        if (this.calls === 0) {
            this._rewriteReferences();
            this._saveAs(this._wrapTree());
        }
    }
}
