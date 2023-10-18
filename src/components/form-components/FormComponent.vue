<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import type { PropType } from 'vue';
    import { useI18n } from 'vue-i18n';
    import APIService from '@/core/services/api-service';
    import validationHandler from '@/core/handlers/validation-handler';
    import { placeholderAttribute, errorMessage, resetForm } from '@/core/helpers/form-helpers';
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

    const { t, te } = useI18n();
    const formData = reactive<Record<string, string>>(props.data as Record<string, string>);
    const validationErrors = reactive(Object.fromEntries(props.inputs.map(input => [input.inputName, input.rules])));
    const errors = reactive<Record<string, string>>({});

    onMounted(() => {
        if (props.urlId) getFormData(props.urlId, props.config.API);
    });

    const getFormData = async (id: number, endpoint: string ): Promise<void> => {
        const response = await APIService.get(endpoint, id);
        Object.assign(formData, response.data);
        return { ...response.data };
    };

    const submitForm = async (): Promise<void> => {
        let isValid: boolean = true;
        const excludedFields: string[] = props.urlId ? ['id'] : [];

        Object.keys(formData).forEach(field => {
            if (!excludedFields.includes(field)) {
                const fieldErrors: string = validationHandler(field, formData[field] as string, validationErrors);

                if (fieldErrors.length > 0) {
                    isValid = false;
                }
                errors[field] = fieldErrors;
            }
        });

        if (isValid) {
            if (props.urlId) {
                await APIService.update(props.config.API, props.urlId, formData);
            }
            else {
                await APIService.store(props.config.API, formData);
                resetForm(formData);
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
                :required="input.rules !== ''"
                :error-message="getErrorMessage(input.inputName, errors[input.inputName])"
            />
        </div>
        <slot name="buttons" />
    </form>

</template>
