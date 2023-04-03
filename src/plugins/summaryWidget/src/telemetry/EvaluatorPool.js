/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './SummaryWidgetEvaluator',
    'objectUtils'
], function (
    SummaryWidgetEvaluator,
    objectUtils
) {

    function EvaluatorPool(openmct) {
        this.openmct = openmct;
        this.byObjectId = {};
        this.byEvaluator = new WeakMap();
    }

    EvaluatorPool.prototype.get = function (domainObject) {
        const objectId = objectUtils.makeKeyString(domainObject.identifier);
        let poolEntry = this.byObjectId[objectId];
        if (!poolEntry) {
            poolEntry = {
                leases: 0,
                objectId: objectId,
                evaluator: new SummaryWidgetEvaluator(domainObject, this.openmct)
            };
            this.byEvaluator.set(poolEntry.evaluator, poolEntry);
            this.byObjectId[objectId] = poolEntry;
        }

        poolEntry.leases += 1;

        return poolEntry.evaluator;
    };

    EvaluatorPool.prototype.release = function (evaluator) {
        const poolEntry = this.byEvaluator.get(evaluator);
        poolEntry.leases -= 1;
        if (poolEntry.leases === 0) {
            evaluator.destroy();
            this.byEvaluator.delete(evaluator);
            delete this.byObjectId[poolEntry.objectId];
        }
    };

    return EvaluatorPool;
});
