/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<div
    class="c-cs"
    :class="{'is-stale': isStale }"
>
    <section class="c-cs__current-output c-section">
        <div class="c-cs__content c-cs__current-output-value">
            <span class="c-cs__current-output-value__label">Current Output</span>
            <span
                class="c-cs__current-output-value__value"
                aria-label="Current Output Value"
            >
                <template v-if="currentConditionOutput">
                    {{ currentConditionOutput }}
                </template>
                <template v-else>
                    ---
                </template>
            </span>
        </div>
    </section>
    <div class="c-cs__test-data-and-conditions-w">
        <TestData
            class="c-cs__test-data"
            :is-editing="isEditing"
            :test-data="testData"
            :telemetry="telemetryObjs"
            @updateTestData="updateTestData"
        />
        <ConditionCollection
            class="c-cs__conditions"
            :is-editing="isEditing"
            :test-data="testData"
            @conditionSetResultUpdated="updateCurrentOutput"
            @noTelemetryObjects="updateCurrentOutput('---')"
            @telemetryUpdated="updateTelemetry"
            @telemetryStaleness="handleStaleness"
        />
    </div>
</div>
</template>

<script>
import TestData from './TestData.vue';
import ConditionCollection from './ConditionCollection.vue';

export default {
    components: {
        TestData,
        ConditionCollection
    },
    inject: ["openmct", "domainObject"],
    props: {
        isEditing: Boolean
    },
    data() {
        return {
            currentConditionOutput: '',
            telemetryObjs: [],
            testData: {},
            staleObjects: []
        };
    },
    computed: {
        isStale() {
            return this.staleObjects.length !== 0;
        }
    },
    mounted() {
        this.conditionSetIdentifier = this.openmct.objects.makeKeyString(this.domainObject.identifier);
        this.testData = {
            applied: false,
            conditionTestInputs: this.domainObject.configuration.conditionTestData || []
        };
    },
    methods: {
        updateCurrentOutput(currentConditionResult) {
            this.currentConditionOutput = currentConditionResult.output;
        },
        updateDefaultOutput(output) {
            this.currentConditionOutput = output;
        },
        updateTelemetry(telemetryObjs) {
            this.telemetryObjs = telemetryObjs;
        },
        updateTestData(testData) {
            this.testData = testData;
        },
        handleStaleness({ keyString, isStale }) {
            const index = this.staleObjects.indexOf(keyString);
            if (isStale) {
                if (index === -1) {
                    this.staleObjects.push(keyString);
                }
            } else {
                if (index !== -1) {
                    this.staleObjects.splice(index, 1);
                }
            }
        }
    }
};
</script>

