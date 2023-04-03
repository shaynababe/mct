/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import EventEmitter from 'EventEmitter';

export default class StatusAPI extends EventEmitter {
    constructor(openmct) {
        super();

        this._openmct = openmct;
        this._statusCache = {};

        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.observe = this.observe.bind(this);
    }

    get(identifier) {
        let keyString = this._openmct.objects.makeKeyString(identifier);

        return this._statusCache[keyString];
    }

    set(identifier, value) {
        let keyString = this._openmct.objects.makeKeyString(identifier);

        this._statusCache[keyString] = value;
        this.emit(keyString, value);
    }

    delete(identifier) {
        let keyString = this._openmct.objects.makeKeyString(identifier);

        this._statusCache[keyString] = undefined;
        this.emit(keyString, undefined);
        delete this._statusCache[keyString];
    }

    observe(identifier, callback) {
        let key = this._openmct.objects.makeKeyString(identifier);

        this.on(key, callback);

        return () => {
            this.off(key, callback);
        };
    }
}
