/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/**
 * A CouchDocument describes domain object model in a format
 * which is easily read-written to CouchDB. This includes
 * Couch's _id and _rev fields, as well as a separate
 * metadata field which contains a subset of information found
 * in the model itself (to support search optimization with
 * CouchDB views.)
 * @memberof platform/persistence/couch
 * @constructor
 * @param {string} id the id under which to store this mode
 * @param {object} model the model to store
 * @param {string} rev the revision to include (or undefined,
 *        if no revision should be noted for couch)
 * @param {boolean} whether or not to mark this document as
 *        deleted (see CouchDB docs for _deleted)
 */
export default function CouchDocument(id, model, rev, markDeleted) {
    return {
        "_id": id,
        "_rev": rev,
        "_deleted": markDeleted,
        "metadata": {
            "category": "domain object",
            "type": model.type,
            "owner": "admin",
            "name": model.name
        },
        "model": model
    };
}
