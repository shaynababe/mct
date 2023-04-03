/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class LocalStorageObjectProvider {
    constructor(spaceKey = 'mct') {
        this.localStorage = window.localStorage;
        this.spaceKey = spaceKey;
        this.initializeSpace(spaceKey);
    }

    get(identifier) {
        if (this.getSpaceAsObject()[identifier.key] !== undefined) {
            const persistedModel = this.getSpaceAsObject()[identifier.key];
            const domainObject = {
                identifier,
                ...persistedModel
            };

            return Promise.resolve(domainObject);
        } else {
            return Promise.resolve(undefined);
        }
    }

    getAllObjects() {
        return this.getSpaceAsObject();
    }

    create(object) {
        return this.persistObject(object);
    }

    update(object) {
        return this.persistObject(object);
    }

    /**
     * @private
     */
    persistObject(domainObject) {
        let space = this.getSpaceAsObject();
        space[domainObject.identifier.key] = domainObject;

        this.persistSpace(space);

        return Promise.resolve(true);
    }

    /**
     * @private
     */
    persistSpace(space) {
        this.localStorage[this.spaceKey] = JSON.stringify(space);
    }

    /**
     * @private
     */
    getSpace() {
        return this.localStorage[this.spaceKey];
    }

    /**
     * @private
     */
    getSpaceAsObject() {
        return JSON.parse(this.getSpace());
    }

    /**
     * @private
     */
    initializeSpace() {
        if (this.isEmpty()) {
            this.localStorage[this.spaceKey] = JSON.stringify({});
        }
    }

    /**
     * @private
     */
    isEmpty() {
        return this.getSpace() === undefined;
    }
}
