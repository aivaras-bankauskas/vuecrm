<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import APIService from '@/core/services/api-service';
    import validationHandler from '@/core/handlers/validation-handler';
    import { placeholderAttribute, errorMessage, resetForm } from '@/core/helpers/form-helpers';
    import InputComponent from '../input-components/InputComponent.vue';
    import InputInterface from '@/core/interfaces/InputInterface';
    import ConfigInterface from '@/core/interfaces/ConfigInterface';

    const props = defineProps<{
        urlId?: number | null;
        config: ConfigInterface;
        data: Record<string, unknown>;
        inputs: InputInterface[];
    }>();

    const { t, te } = useI18n();
    const formData = reactive(props.data as Record<string, string>);
    const initialFormData = reactive<Record<string, string>>({});
    const validationErrors = reactive(Object.fromEntries(props.inputs.map(input => [input.inputName, input.rules])));
    const errors = reactive<Record<string, string>>({});

    onMounted(() => {
        props.urlId && getFormData(props.urlId, props.config.API);
    });

    const getFormData = async (id: number, endpoint: string): Promise<void> => {
        const response = await APIService.get(endpoint, id);
        Object.assign(formData, response.data);
        Object.assign(initialFormData, response.data);
    };

    const submitForm = async (): Promise<void> => {
        let isValid = true;
        const excludedFields: string[] = props.urlId ? ['id'] : [];

        for (const field of Object.keys(formData)) {
            if (excludedFields.includes(field)) continue;

            const fieldErrors = validationHandler(field, formData[field], validationErrors);
            if (fieldErrors) {
                isValid = false;
            }
            errors[field] = fieldErrors;
        }

        if (isValid) {
            const endpoint = props.config.API;

            if (!props.urlId) {
                await APIService.store(endpoint, formData);
                resetForm(formData);
            } else if (JSON.stringify(initialFormData) !== JSON.stringify(formData)) {
                await APIService.update(endpoint, props.urlId, formData);
                getFormData(props.urlId, endpoint);
            }
        }
    };

    const getPlaceholderAttribute = (inputName: string): string => placeholderAttribute(inputName, t, te);
    const getErrorMessage = (inputName: string, error: string): string => errorMessage(inputName, error, t);
</script>

<template>
    <form novalidate @submit.prevent="submitForm">
        <div v-for="(input, index) in inputs" :key="index">
            <InputComponent
                :id="input.inputName"
                v-model="formData[input.inputName]"
                :input-name="input.inputName"
                :input-type="input.inputType"
                :label="t(`labels.${input.inputName}`)"
                :placeholder="getPlaceholderAttribute(input.inputName)"
                :required="!!input.rules"
                :error-message="getErrorMessage(input.inputName, errors[input.inputName])"
            />
        </div>
        <slot name="buttons" />
    </form>
</template>
