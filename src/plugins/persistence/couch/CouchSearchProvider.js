/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

// This provider exists because due to legacy reasons, we need to install
// two plugins for two namespaces for CouchDB: one for "mct", and one for "".
// Because of this, we need to separate out the search provider from the object
// provider so we don't return two results for each found object.
// If the above namespace is ever resolved, we can fold this search provider
// back into the object provider.

class CouchSearchProvider {
    constructor(couchObjectProvider) {
        this.couchObjectProvider = couchObjectProvider;
        this.searchTypes = couchObjectProvider.openmct.objects.SEARCH_TYPES;
        this.supportedSearchTypes = [this.searchTypes.OBJECTS, this.searchTypes.ANNOTATIONS, this.searchTypes.TAGS];
    }

    supportsSearchType(searchType) {
        return this.supportedSearchTypes.includes(searchType);
    }

    search(query, abortSignal, searchType) {
        if (searchType === this.searchTypes.OBJECTS) {
            return this.searchForObjects(query, abortSignal);
        } else if (searchType === this.searchTypes.ANNOTATIONS) {
            return this.searchForAnnotations(query, abortSignal);
        } else if (searchType === this.searchTypes.TAGS) {
            return this.searchForTags(query, abortSignal);
        } else {
            throw new Error(`🤷‍♂️ Unknown search type passed: ${searchType}`);
        }
    }

    searchForObjects(query, abortSignal) {
        const filter = {
            "selector": {
                "model": {
                    "name": {
                        "$regex": `(?i)${query}`
                    }
                }
            }
        };

        return this.couchObjectProvider.getObjectsByFilter(filter, abortSignal);
    }

    searchForAnnotations(keyString, abortSignal) {
        const filter = {
            "selector": {
                "$and": [
                    {
                        "model": {
                            "targets": {
                            }
                        }
                    },
                    {
                        "model.type": {
                            "$eq": "annotation"
                        }
                    }
                ]
            }
        };
        filter.selector.$and[0].model.targets[keyString] = {
            "$exists": true
        };

        return this.couchObjectProvider.getObjectsByFilter(filter, abortSignal);
    }

    searchForTags(tagsArray, abortSignal) {
        if (!tagsArray || !tagsArray.length) {
            return [];
        }

        const filter = {
            "selector": {
                "$and": [
                    {
                        "model.tags": {
                            "$elemMatch": {
                                "$or": [
                                ]
                            }
                        }
                    },
                    {
                        "model.type": {
                            "$eq": "annotation"
                        }
                    }
                ]
            }
        };
        tagsArray.forEach(tag => {
            filter.selector.$and[0]["model.tags"].$elemMatch.$or.push({
                "$eq": `${tag}`
            });
        });

        return this.couchObjectProvider.getObjectsByFilter(filter, abortSignal);
    }

}
export default CouchSearchProvider;
