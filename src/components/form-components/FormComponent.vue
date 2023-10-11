<script setup lang="ts">
    import { defineAsyncComponent, reactive } from 'vue';
    import type { PropType } from 'vue';
    import APIService from '@/core/services/api-service';
    import validationHandler from '@/core/utilities/validation/validation-hendler';
    import InputInterface from '@/interfaces/InputInterface';

    const InputGroup = defineAsyncComponent(() => import('@/components/input-components/InputGroup.vue'));

    const props = defineProps({
        config: {
            type: Object,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        inputs: {
            type: Array as PropType<InputInterface[]>,
            required: true
        }
    });

    const formData = reactive({ ...props.data });

    const validationErrors = reactive(
        Object.fromEntries(Object.keys(formData).map(key => [key, '']))
    );

    const handleSubmit = async (): Promise<void> => {
        const formElement = document.querySelector('form');
        const [isValid, errors] = validationHandler.validateFormData(formElement);

        for (const key of Object.keys(validationErrors)) {
            validationErrors[key] = '';
        }

        if (isValid) {
            await APIService.store(props.config.API, formData);
            resetFormData();
        } else {
            Object.assign(validationErrors, errors);
        }
    };

    const resetFormData = (): void => {
        Object.assign(formData, props.data);
    };
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <InputGroup
            :form-data="formData"
            :inputs="inputs"
            :validation-errors="validationErrors"
        />
        <div class="pt-4">
            <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
        </div>
    </form>

</template>
