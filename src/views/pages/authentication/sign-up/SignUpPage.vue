<script setup lang="ts">
    import { defineAsyncComponent, reactive } from 'vue';
    import APIService from '@/core/services/api-service';
    import UserInterface from '@/interfaces/UserInterface';
    import validationHandler from '@/core/utilities/validation/validation-hendler';

    const InputComponent = defineAsyncComponent(() => import('@/components/input-components/InputComponent.vue'));

    const data = {
        formData: {
            'firstName': '',
        },
        input: {
            inputTitle: 'First name',
            inputName: 'firstName',
            rules: ['required', 'alpha']
        },
    };

    const formData = reactive<UserInterface>({ ...data.formData });

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
            await APIService.store('/users', formData);
            resetFormData();
        } else {
            Object.assign(validationErrors, errors);
        }
    };

    const resetFormData = (): void => {
        Object.assign(formData, data.formData);
    };
</script>

<template>
    <div class="flex min-h-full flex-col py-10 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
                <div class="mt-10">
                    <form class="space-y-4" @submit.prevent="handleSubmit">
                        <div>
                            <InputComponent
                                v-model="formData.firstName"
                                :input-name="data.input.inputName"
                                :rules="data.input.rules.join('|')"
                                :error="validationErrors[data.input.inputName]"
                            />
                        </div>
                        <div class="pt-4">
                            <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
