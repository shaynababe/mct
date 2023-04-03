/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<section
    v-show="isEditing"
    id="test-data"
    :class="{ 'is-expanded': expanded }"
>
    <div class="c-cs__header c-section__header">
        <span
            class="c-disclosure-triangle c-tree__item__view-control is-enabled"
            :class="{ 'c-disclosure-triangle--expanded': expanded }"
            @click="expanded = !expanded"
        ></span>
        <div class="c-cs__header-label c-section__label">Test Data</div>
    </div>
    <div
        v-if="expanded"
        class="c-cs__content"
    >
        <div
            class="c-cs__test-data__controls c-cdef__controls"
            :disabled="!telemetry.length"
        >
            <label class="c-toggle-switch">
                <input
                    type="checkbox"
                    :checked="isApplied"
                    @change="applyTestData"
                >
                <span class="c-toggle-switch__slider"></span>
                <span class="c-toggle-switch__label">Apply Test Data</span>
            </label>
        </div>
        <div class="c-cs-tests">
            <span
                v-for="(testInput, tIndex) in testInputs"
                :key="tIndex"
                class="c-test-datum c-cs-test"
            >
                <span class="c-cs-test__label">Set</span>
                <span class="c-cs-test__controls">
                    <span class="c-cdef__control">
                        <select
                            v-model="testInput.telemetry"
                            @change="updateMetadata(testInput)"
                        >
                            <option value="">- Select Telemetry -</option>
                            <option
                                v-for="(telemetryOption, index) in telemetry"
                                :key="index"
                                :value="telemetryOption.identifier"
                            >
                                {{ telemetryOption.name }}
                            </option>
                        </select>
                    </span>
                    <span
                        v-if="testInput.telemetry"
                        class="c-cdef__control"
                    >
                        <select
                            v-model="testInput.metadata"
                            @change="updateTestData"
                        >
                            <option value="">- Select Field -</option>
                            <option
                                v-for="(option, index) in telemetryMetadataOptions[getId(testInput.telemetry)]"
                                :key="index"
                                :value="option.key"
                            >
                                {{ option.name }}
                            </option>
                        </select>
                    </span>
                    <span
                        v-if="testInput.metadata"
                        class="c-cdef__control__inputs"
                    >
                        <input
                            v-model="testInput.value"
                            placeholder="Enter test input"
                            type="text"
                            class="c-cdef__control__input"
                            @change="updateTestData"
                        >
                    </span>
                </span>
                <div class="c-cs-test__buttons">
                    <button
                        class="c-click-icon c-test-data__duplicate-button icon-duplicate"
                        title="Duplicate this test datum"
                        @click="addTestInput(testInput)"
                    ></button>
                    <button
                        class="c-click-icon c-test-data__delete-button icon-trash"
                        title="Delete this test datum"
                        @click="removeTestInput(tIndex)"
                    ></button>
                </div>
            </span>
        </div>
        <button
            v-show="isEditing"
            id="addTestDatum"
            class="c-button c-button--major icon-plus labeled"
            @click="addTestInput"
        >
            <span class="c-cs-button__label">Add Test Datum</span>
        </button>
    </div>
</section>
</template>

<script>
export default {
    inject: ['openmct'],
    props: {
        isEditing: Boolean,
        telemetry: {
            type: Array,
            required: true,
            default: () => []
        },
        testData: {
            type: Object,
            required: true,
            default: () => {
                return {
                    applied: false,
                    conditionTestInputs: []
                };
            }
        }
    },
    data() {
        return {
            expanded: true,
            isApplied: false,
            testInputs: [],
            telemetryMetadataOptions: {}
        };
    },
    watch: {
        isEditing(editing) {
            if (!editing) {
                this.resetApplied();
            }
        },
        telemetry: {
            handler() {
                this.initializeMetadata();
            },
            deep: true
        },
        testData: {
            handler() {
                this.initialize();
            },
            deep: true
        }
    },
    beforeDestroy() {
        this.resetApplied();
    },
    mounted() {
        this.initialize();
        this.initializeMetadata();
    },
    methods: {
        applyTestData() {
            this.isApplied = !this.isApplied;
            this.updateTestData();
        },
        initialize() {
            if (this.testData && this.testData.conditionTestInputs) {
                this.testInputs = this.testData.conditionTestInputs;
            }

            if (!this.testInputs.length) {
                this.addTestInput();
            }
        },
        initializeMetadata() {
            this.telemetry.forEach((telemetryObject) => {
                const id = this.openmct.objects.makeKeyString(telemetryObject.identifier);
                let telemetryMetadata = this.openmct.telemetry.getMetadata(telemetryObject);
                if (telemetryMetadata) {
                    this.telemetryMetadataOptions[id] = telemetryMetadata.values().slice();
                } else {
                    this.telemetryMetadataOptions[id] = [];
                }
            });
        },
        addTestInput(testInput) {
            this.testInputs.push(Object.assign({
                telemetry: '',
                metadata: '',
                input: ''
            }, testInput));
        },
        removeTestInput(index) {
            this.testInputs.splice(index, 1);
            this.updateTestData();
        },
        getId(identifier) {
            if (identifier) {
                return this.openmct.objects.makeKeyString(identifier);
            }

            return [];
        },
        updateMetadata(testInput) {
            if (testInput.telemetry) {
                const id = this.openmct.objects.makeKeyString(testInput.telemetry);
                if (this.telemetryMetadataOptions[id]) {
                    return;
                }

                let telemetryMetadata = this.openmct.telemetry.getMetadata(testInput);
                this.telemetryMetadataOptions[id] = telemetryMetadata.values().slice();
            }
        },
        resetApplied() {
            this.isApplied = false;
            this.updateTestData();
        },
        updateTestData() {
            this.$emit('updateTestData', {
                applied: this.isApplied,
                conditionTestInputs: this.testInputs
            });
        }
    }
};
</script>
