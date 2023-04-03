/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

export default class CouchObjectQueue {
    constructor(object, rev) {
        this.rev = rev;
        this.objects = object ? [object] : [];
        this.pending = false;
    }

    updateRevision(rev) {
        this.rev = rev;
    }

    hasNext() {
        return this.objects.length;
    }

    enqueue(item) {
        this.objects.push(item);
    }

    dequeue() {
        return this.objects.shift();
    }

    clear() {
        this.rev = undefined;
        this.objects = [];
    }

}
