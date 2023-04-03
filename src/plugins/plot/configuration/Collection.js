/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import Model from './Model';

/**
 * @template {object} T
 * @template {object} O
 * @extends {Model<T, O>}
 */
export default class Collection extends Model {
    /** @type {Constructor} */
    modelClass = Model;

    initialize(options) {
        super.initialize(options);
        if (options.models) {
            this.models = options.models.map(this.modelFn, this);
        } else {
            this.models = [];
        }
    }

    modelFn(model) {
        //TODO: Come back to this - why are we doing this?
        if (model instanceof this.modelClass) {
            model.collection = this;

            return model;

        }

        return new this.modelClass({
            collection: this,
            model: model
        });
    }

    first() {
        return this.at(0);
    }

    forEach(iteree, context) {
        this.models.forEach(iteree, context);
    }

    map(iteree, context) {
        return this.models.map(iteree, context);
    }

    filter(iteree, context) {
        return this.models.filter(iteree, context);
    }

    size() {
        return this.models.length;
    }

    at(index) {
        return this.models[index];
    }

    add(model) {
        model = this.modelFn(model);
        const index = this.models.length;
        this.models.push(model);
        this.emit('add', model, index);
    }

    insert(model, index) {
        model = this.modelFn(model);
        this.models.splice(index, 0, model);
        this.emit('add', model, index + 1);
    }

    indexOf(model) {
        return this.models.findIndex(m => m === model);
    }

    remove(model) {
        const index = this.indexOf(model);

        if (index === -1) {
            throw new Error('model not found in collection.');
        }

        this.models.splice(index, 1);
        this.emit('remove', model, index);
    }

    destroy(model) {
        this.forEach(function (m) {
            m.destroy();
        });
        this.stopListening();
    }
}

/** @typedef {any} TODO */

/** @typedef {new (...args: any[]) => object} Constructor */
