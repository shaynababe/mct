/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


export default class Transaction {
    constructor(objectAPI) {
        this.dirtyObjects = {};
        this.objectAPI = objectAPI;
    }

    add(object) {
        const key = this.objectAPI.makeKeyString(object.identifier);

        this.dirtyObjects[key] = object;
    }

    cancel() {
        return this._clear();
    }

    commit() {
        const promiseArray = [];
        const save = this.objectAPI.save.bind(this.objectAPI);

        Object.values(this.dirtyObjects).forEach(object => {
            promiseArray.push(this.createDirtyObjectPromise(object, save));
        });

        return Promise.all(promiseArray);
    }

    createDirtyObjectPromise(object, action) {
        return new Promise((resolve, reject) => {
            action(object)
                .then((success) => {
                    const key = this.objectAPI.makeKeyString(object.identifier);

                    delete this.dirtyObjects[key];
                    resolve(success);
                })
                .catch(reject);
        });
    }

    getDirtyObject(identifier) {
        let dirtyObject;

        Object.values(this.dirtyObjects).forEach(object => {
            const areIdsEqual = this.objectAPI.areIdsEqual(object.identifier, identifier);
            if (areIdsEqual) {
                dirtyObject = object;
            }
        });

        return dirtyObject;
    }

    _clear() {
        const promiseArray = [];
        const refresh = this.objectAPI.refresh.bind(this.objectAPI);

        Object.values(this.dirtyObjects).forEach(object => {
            promiseArray.push(this.createDirtyObjectPromise(object, refresh));
        });

        return Promise.all(promiseArray);
    }
}
