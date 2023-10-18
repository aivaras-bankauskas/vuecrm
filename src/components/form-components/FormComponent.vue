<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { getFormData, submitFormData } from '@/core/handlers/form-handler';
    import { placeholderAttribute, errorMessage } from '@/core/helpers/form-helpers';
    import InputComponent from '../input-components/InputComponent.vue';
    import InputInterface from '@/core/interfaces/InputInterface';
    import ConfigInterface from '@/core/interfaces/ConfigInterface';

    const props = defineProps<{
        urlId: number | null;
        config: ConfigInterface;
        data: unknown;
        inputs: InputInterface[];
    }>();

    const { t, te } = useI18n();
    const formData = reactive(props.data as Record<string, string>);
    const initialFormData = reactive({ ...props.data as Record<string, string> });
    const validationErrors = reactive(Object.fromEntries(props.inputs.map(({ inputName, rules }) => [inputName, rules])));
    const errors = reactive<Record<string, string>>({});

    onMounted(() => {
        props.urlId && getFormData(props.urlId, props.config.API, formData, initialFormData);
    });

    const submitForm = async (): Promise<void> => {
        submitFormData(props.urlId as number, formData, initialFormData, validationErrors, props.config, errors);
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
