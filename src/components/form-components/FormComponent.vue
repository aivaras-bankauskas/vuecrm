<script setup lang="ts">
    import { reactive } from 'vue';
    import type { PropType } from 'vue';
    import APIService from '@/core/services/api-service';
    import InputComponent from '../input-components/InputComponent.vue';
    import InputInterface from '@/core/interfaces/InputInterface';
    import ConfigInterface from '@/core/interfaces/ConfigInterface';

    const props = defineProps({
        urlId: {
            type: Number as PropType<number | null>,
            default: null
        },
        config: {
            type: Object as PropType<ConfigInterface>,
            required: true
        },
        data: {
            type: Object as PropType<Record<string, unknown>>,
            required: true
        },
        inputs: {
            type: Array as PropType<InputInterface[]>,
            required: true
        }
    });

    const formData = reactive<Record<string, string>>(props.data as Record<string, string>);
    const validationRules = reactive(Object.fromEntries(props.inputs.map(input => [input.inputName, input.rules])));
    const errors = reactive<Record<string, string>>({});

    const validateField = (field: string, value: string): string => {
        const rules = validationRules[field].split('|');
        let errorMessage: string = '';

        for (const rule of rules) {
            const [ruleName, ruleValue] = rule.split(':');

            if (ruleName === 'required' && !value) {
                errorMessage = `${field} is required`;
                break;
            } else if (ruleName === 'min' && value.length < parseInt(ruleValue)) {
                errorMessage = `${field} must be at least ${ruleValue} characters`;
                break;
            } else if (ruleName === 'alpha' && !/^[a-zA-Z]+$/.test(value)) {
                errorMessage = `${field} must contain only alphabetic characters`;
                break;
            } else if (ruleName === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                errorMessage = 'Invalid email format';
                break;
            }
        }

        return errorMessage;
    };

    const submitForm = async (): Promise<void> => {
        let isValid = true;

        Object.keys(formData).forEach(field => {
            const fieldErrors = validateField(field, formData[field] as string);

            if (fieldErrors.length > 0) {
                isValid = false;
            }
            errors[field] = fieldErrors;
        });

        if (isValid) {
            await APIService.store(props.config.API, formData);
            resetForm();
        }
    };

    const resetForm = (): void => {
        for (const field in formData) {
            formData[field] = '';
        }
    };
</script>

<template>
    <form novalidate @submit.prevent="submitForm">
        <div v-for="(input, index) in inputs" :key="index">
            <InputComponent
                :id="input.inputName"
                v-model="formData[input.inputName]"
                :input-name="input.inputName"
                :input-type="input.inputType"
                :placeholder="input.inputName"
                :error-message="errors[input.inputName]"
            />
        </div>
        <slot name="buttons" />
    </form>

</template>
