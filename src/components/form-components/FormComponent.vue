<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { getFormData, submitFormData } from '@/core/handlers/form-handler';
    import { placeholderAttribute, errorMessage } from '@/core/helpers/form-helpers';
    import router from '@/router';
    import InputComponent from '../input-components/InputComponent.vue';
    import InputInterface from '@/core/interfaces/InputInterface';
    import ConfigInterface from '@/core/interfaces/ConfigInterface';
    import FormDataInterface from '@/core/interfaces/FormDataInterface';

    const props = defineProps<{
        urlId: number | null;
        config: ConfigInterface;
        data: FormDataInterface;
        inputs: InputInterface[];
    }>();

    const { t, te } = useI18n();
    const formData = reactive(props.data);
    const initialFormData = reactive({ ...props.data });
    const validationErrors = reactive(Object.fromEntries(props.inputs.map(({ inputName, rules }) => [inputName, rules])));
    const errors = reactive<FormDataInterface>({});

    onMounted(() => {
        props.urlId && getFormData(props.urlId, props.config.API, formData, initialFormData);
    });

    const submitForm = async (): Promise<void> => {
        const isFormSubmitted = await submitFormData(props.urlId as number, formData, initialFormData, validationErrors, props.config, errors);
        if (isFormSubmitted) router.push(props.config.redirect as string);
        if (isFormSubmitted && props.config.name === 'signIn') router.push('/');
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
