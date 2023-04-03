/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/
class ConfigStore {
    /** @type {Record<string, Destroyable>} */
    store = {};

    /**
    @param {string} id
    */
    deleteStore(id) {
        const obj = this.store[id];

        if (obj) {
            if (obj.destroy) {
                obj.destroy();
            }

            delete this.store[id];
        }
    }

    deleteAll() {
        Object.keys(this.store).forEach(id => this.deleteStore(id));
    }

    /**
    @param {string} id
    @param {any} config
    */
    add(id, config) {
        this.store[id] = config;
    }

    /**
    @param {string} id
    */
    get(id) {
        return this.store[id];
    }
}

const STORE = new ConfigStore();

export default STORE;

/** @typedef {{destroy?(): void}} Destroyable */
