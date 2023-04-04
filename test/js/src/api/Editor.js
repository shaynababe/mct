
/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import EventEmitter from 'EventEmitter';

export default class Editor extends EventEmitter {
    constructor(openmct) {
        super();
        this.editing = false;
        this.openmct = openmct;
    }

    /**
     * Initiate an editing session. This will start a transaction during
     * which any persist operations will be deferred until either save()
     * or finish() are called.
     */
    edit() {
        if (this.editing === true) {
            throw "Already editing";
        }

        this.editing = true;
        this.emit('isEditing', true);
        this.openmct.objects.startTransaction();
    }

    /**
     * @returns {boolean} true if the application is in edit mode, false otherwise.
     */
    isEditing() {
        return this.editing;
    }

    /**
     * Save any unsaved changes from this editing session. This will
     * end the current transaction.
     */
    async save() {
        const transaction = this.openmct.objects.getActiveTransaction();
        await transaction.commit();
        this.editing = false;
        this.emit('isEditing', false);
        this.openmct.objects.endTransaction();
    }

    /**
     * End the currently active transaction and discard unsaved changes.
     */
    cancel() {
        this.editing = false;
        this.emit('isEditing', false);

        return new Promise((resolve, reject) => {
            const transaction = this.openmct.objects.getActiveTransaction();
            if (!transaction) {
                return resolve();
            }

            transaction.cancel()
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.openmct.objects.endTransaction();
                });
        });
    }
}
