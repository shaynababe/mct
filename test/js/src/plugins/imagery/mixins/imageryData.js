/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


const DEFAULT_DURATION_FORMATTER = 'duration';
const IMAGE_HINT_KEY = 'image';
const IMAGE_THUMBNAIL_HINT_KEY = 'thumbnail';
const IMAGE_DOWNLOAD_NAME_HINT_KEY = 'imageDownloadName';

export default {
    inject: ['openmct', 'domainObject', 'objectPath'],
    mounted() {
        // listen
        this.boundsChange = this.boundsChange.bind(this);
        this.timeSystemChange = this.timeSystemChange.bind(this);
        this.setDataTimeContext = this.setDataTimeContext.bind(this);
        this.setDataTimeContext();
        this.openmct.objectViews.on('clearData', this.dataCleared);

        // Get metadata and formatters
        this.keyString = this.openmct.objects.makeKeyString(this.domainObject.identifier);
        this.metadata = this.openmct.telemetry.getMetadata(this.domainObject);

        this.imageMetadataValue = { ...this.metadata.valuesForHints([IMAGE_HINT_KEY])[0] };
        this.imageFormatter = this.getFormatter(this.imageMetadataValue.key);

        this.imageThumbnailMetadataValue = { ...this.metadata.valuesForHints([IMAGE_THUMBNAIL_HINT_KEY])[0] };
        this.imageThumbnailFormatter = this.imageThumbnailMetadataValue.key
            ? this.getFormatter(this.imageThumbnailMetadataValue.key)
            : null;

        this.durationFormatter = this.getFormatter(this.timeSystem.durationFormat || DEFAULT_DURATION_FORMATTER);
        this.imageDownloadNameMetadataValue = { ...this.metadata.valuesForHints([IMAGE_DOWNLOAD_NAME_HINT_KEY])[0]};

        // initialize
        this.timeKey = this.timeSystem.key;
        this.timeFormatter = this.getFormatter(this.timeKey);

        this.telemetryCollection = this.openmct.telemetry.requestCollection(this.domainObject, {});
        this.telemetryCollection.on('add', this.dataAdded);
        this.telemetryCollection.on('remove', this.dataRemoved);
        this.telemetryCollection.on('clear', this.dataCleared);
        this.telemetryCollection.load();
    },
    beforeDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
            delete this.unsubscribe;
        }

        this.stopFollowingDataTimeContext();
        this.openmct.objectViews.off('clearData', this.dataCleared);

        this.telemetryCollection.off('add', this.dataAdded);
        this.telemetryCollection.off('remove', this.dataRemoved);
        this.telemetryCollection.off('clear', this.dataCleared);

        this.telemetryCollection.destroy();
    },
    methods: {
        dataAdded(addedItems, addedItemIndices) {
            const normalizedDataToAdd = addedItems.map(datum => this.normalizeDatum(datum));
            let newImageHistory = this.imageHistory.slice();
            normalizedDataToAdd.forEach(((datum, index) => {
                newImageHistory.splice(addedItemIndices[index] ?? -1, 0, datum);
            }));
            //Assign just once so imageHistory watchers don't get called too often
            this.imageHistory = newImageHistory;
        },
        dataCleared() {
            this.imageHistory = [];
        },
        dataRemoved(dataToRemove) {
            this.imageHistory = this.imageHistory.filter(existingDatum => {
                const shouldKeep = dataToRemove.some(datumToRemove => {
                    const existingDatumTimestamp = this.parseTime(existingDatum);
                    const datumToRemoveTimestamp = this.parseTime(datumToRemove);

                    return (existingDatumTimestamp !== datumToRemoveTimestamp);
                });

                return shouldKeep;
            });
        },
        setDataTimeContext() {
            this.stopFollowingDataTimeContext();
            this.timeContext = this.openmct.time.getContextForView(this.objectPath);
            this.timeContext.on('bounds', this.boundsChange);
            this.boundsChange(this.timeContext.bounds());
            this.timeContext.on('timeSystem', this.timeSystemChange);
        },
        stopFollowingDataTimeContext() {
            if (this.timeContext) {
                this.timeContext.off('bounds', this.boundsChange);
                this.timeContext.off('timeSystem', this.timeSystemChange);
            }
        },
        formatImageUrl(datum) {
            if (!datum) {
                return;
            }

            return this.imageFormatter.format(datum);
        },
        formatImageThumbnailUrl(datum) {
            if (!datum || !this.imageThumbnailFormatter) {
                return;
            }

            return this.imageThumbnailFormatter.format(datum);
        },
        formatTime(datum) {
            if (!datum) {
                return;
            }

            const dateTimeStr = this.timeFormatter.format(datum);

            // Replace ISO "T" with a space to allow wrapping
            return dateTimeStr.replace("T", " ");
        },
        getImageDownloadName(datum) {
            let imageDownloadName = '';
            if (datum) {
                const key = this.imageDownloadNameMetadataValue.key;
                imageDownloadName = datum[key];
            }

            return imageDownloadName;
        },
        parseTime(datum) {
            if (!datum) {
                return;
            }

            return this.timeFormatter.parse(datum);
        },
        boundsChange(bounds, isTick) {
            if (isTick) {
                return;
            }

            this.bounds = bounds; // setting bounds for ImageryView watcher
        },
        timeSystemChange() {
            this.timeSystem = this.timeContext.timeSystem();
            this.timeKey = this.timeSystem.key;
            this.timeFormatter = this.getFormatter(this.timeKey);
            this.durationFormatter = this.getFormatter(this.timeSystem.durationFormat || DEFAULT_DURATION_FORMATTER);
        },
        normalizeDatum(datum) {
            const formattedTime = this.formatTime(datum);
            const url = this.formatImageUrl(datum);
            const thumbnailUrl = this.formatImageThumbnailUrl(datum);
            const time = this.parseTime(formattedTime);
            const imageDownloadName = this.getImageDownloadName(datum);

            return {
                ...datum,
                formattedTime,
                url,
                thumbnailUrl,
                time,
                imageDownloadName
            };
        },
        getFormatter(key) {
            const metadataValue = this.metadata.value(key) || { format: key };
            const valueFormatter = this.openmct.telemetry.getValueFormatter(metadataValue);

            return valueFormatter;
        }
    }
};
